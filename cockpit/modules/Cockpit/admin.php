<?php


/**
 * Helpers
 */

// because auto-load not ready yet
include(__DIR__.'/Helper/Admin.php');

$app->helpers['admin']  = 'Cockpit\\Helper\\Admin';

// init + load i18n
$app('i18n')->locale = 'en';

if ($user = $app->module('cockpit')->getUser()) {

    $locale = isset($user['i18n']) ? $user['i18n'] : $app->retrieve('i18n', 'en');

    if ($translationspath = $app->path("#config:cockpit/i18n/{$locale}.php")) {
        $app('i18n')->locale = $locale;
        $app('i18n')->load($translationspath, $locale);
    }
}

$app->bind('/cockpit.i18n.data', function() {
    $this->response->mime = 'js';
    $data = $this('i18n')->data($this('i18n')->locale);
    return 'if (i18n) { i18n.register('.(count($data) ? json_encode($data):'{}').'); }';
});


/**
 * register assets
 */

$assets = [

    // polyfills
    'assets:polyfills/es6-shim.js',
    'assets:polyfills/dom4.js',
    'assets:polyfills/fetch.js',
    'assets:polyfills/document-register-element.js',
    'assets:polyfills/web-animations.min.js',
    'assets:polyfills/pointer-events.js',

    // libs
    'assets:lib/moment.js',
    'assets:lib/jquery.js',
    'assets:lib/lodash.js',
    'assets:lib/riot/riot.js',
    'assets:lib/riot/riot.bind.js',
    'assets:lib/riot/riot.view.js',
    'assets:lib/uikit/js/uikit.min.js',
    'assets:lib/uikit/js/components/notify.min.js',
    'assets:lib/uikit/js/components/tooltip.min.js',
    'assets:lib/uikit/js/components/lightbox.min.js',
    'assets:lib/uikit/js/components/sortable.min.js',
    'assets:lib/uikit/js/components/sticky.min.js',
    'assets:lib/mousetrap.js',
    'assets:lib/storage.js',
    'assets:lib/i18n.js',

    // app
    'assets:app/js/app.js',
    'assets:app/js/app.utils.js',
    'assets:app/js/codemirror.js',
    'cockpit:assets/components.js',
    'cockpit:assets/cockpit.js',

    'assets:app/css/style.css',
];

// load custom css style
if ($app->path('config:cockpit/style.css')) {
    $assets[] = 'config:cockpit/style.css';
}

$app['app.assets.base'] = $assets;


/**
 * register routes
 */

$app->bind('/', function(){

    if ($this['cockpit.start'] && $this->module('cockpit')->getUser()) {
        $this->reroute($this['cockpit.start']);
    }

    return $this->invoke('Cockpit\\Controller\\Base', 'dashboard');
});

$app->bindClass('Cockpit\\Controller\\Utils', 'cockpit/utils');
$app->bindClass('Cockpit\\Controller\\Base', 'cockpit');
$app->bindClass('Cockpit\\Controller\\Settings', 'settings');
$app->bindClass('Cockpit\\Controller\\Accounts', 'accounts');
$app->bindClass('Cockpit\\Controller\\Auth', 'auth');
$app->bindClass('Cockpit\\Controller\\Media', 'media');
$app->bindClass('Cockpit\\Controller\\Assets', 'assetsmanager');
$app->bindClass('Cockpit\\Controller\\RestAdmin', 'restadmin');
$app->bindClass('Cockpit\\Controller\\Webhooks', 'webhooks');


/**
 * on admint init
 */
$app->on('admin.init', function() {

    // bind finder
    $this->bind('/finder', function() {

        $this->layout = 'cockpit:views/layouts/app.php';
        $this["user"] = $this->module('cockpit')->getUser();
        return $this->view('cockpit:views/base/finder.php');

    }, $this->module("cockpit")->hasaccess('cockpit', 'finder'));

}, 0);


/**
 * listen to app search to filter accounts
 */

$app->on('cockpit.search', function($search, $list) {

    if (!$this->module('cockpit')->hasaccess('cockpit', 'accounts')) {
        return;
    }

    foreach ($this->storage->find('cockpit/accounts') as $a) {

        if (strripos($a['name'].' '.$a['user'], $search)!==false){
            $list[] = [
                'icon'  => 'user',
                'title' => $a['name'],
                'url'   => $this->routeUrl('/accounts/account/'.$a['_id'])
            ];
        }
    }
});

// dashboard widgets


$app->on("admin.dashboard.widgets", function($widgets) {

    $title   = $this("i18n")->get("Today");

    $widgets[] = [
        "name"    => "time",
        "content" => $this->view("cockpit:views/widgets/datetime.php", compact('title')),
        "area"    => 'main'
    ];

}, 100);

/**
 * handle error pages
 */
$app->on("after", function() {

    switch ($this->response->status) {
        case 500:

            if ($this['debug']) {

                if ($this->req_is('ajax')) {
                    $this->response->body = json_encode(['error' => json_decode($this->response->body, true)]);
                } else {
                    $this->response->body = $this->render("cockpit:views/errors/500-debug.php", ['error' => json_decode($this->response->body, true)]);
                }

            } else {

                if ($this->req_is('ajax')) {
                    $this->response->body = '{"error": "500", "message": "system error"}';
                } else {
                    $this->response->body = $this->view("cockpit:views/errors/500.php");
                }
            }

            $this->trigger("cockpit.request.error", ['500']);
            break;

        case 401:

            if ($this->req_is('ajax')) {
                $this->response->body = '{"error": "401", "message":"Unauthorized"}';
            } else {
                $this->response->body = $this->view("cockpit:views/errors/401.php");
            }

            $this->trigger("cockpit.request.error", ['401']);
            break;

        case 404:

            if ($this->req_is('ajax')) {
                $this->response->body = '{"error": "404", "message":"File not found"}';
            } else {

                if (!$this->module('cockpit')->getUser()) {
                    $this->reroute('/auth/login');
                }

                $this->response->body = $this->view("cockpit:views/errors/404.php");
            }

            $this->trigger("cockpit.request.error", ['404']);
            break;
    }

     /**
     * send some debug information
     * back to client (visible in the network panel)
     */
    if ($this['debug'] && !headers_sent()) {

        /**
        * some system info
        */

        $DURATION_TIME = microtime(true) - COCKPIT_START_TIME;
        $MEMORY_USAGE  = memory_get_peak_usage(false)/1024/1024;

        header('COCKPIT_DURATION_TIME: '.$DURATION_TIME.'sec');
        header('COCKPIT_MEMORY_USAGE: '.$MEMORY_USAGE.'mb');
        header('COCKPIT_LOADED_FILES: '.count(get_included_files()));
    }
});

// load package info
$app['cockpit'] = json_decode($app('fs')->read('#root:package.json'), true);

// init app helper
$app('admin')->init();
