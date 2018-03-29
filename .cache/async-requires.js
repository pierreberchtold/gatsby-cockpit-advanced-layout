// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-project-js": require("gatsby-module-loader?name=component---src-templates-project-js!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/templates/project.js"),
  "component---cache-dev-404-page-js": require("gatsby-module-loader?name=component---cache-dev-404-page-js!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/dev-404-page.js"),
  "component---src-pages-404-js": require("gatsby-module-loader?name=component---src-pages-404-js!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/pages/404.js"),
  "component---src-pages-about-js": require("gatsby-module-loader?name=component---src-pages-about-js!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/pages/about.js"),
  "component---src-pages-index-js": require("gatsby-module-loader?name=component---src-pages-index-js!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/pages/index.js")
}

exports.json = {
  "layout-index.json": require("gatsby-module-loader?name=path---!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/layout-index.json"),
  "project-summer-escape.json": require("gatsby-module-loader?name=path---project-summer-escape!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/project-summer-escape.json"),
  "project-a-chairlift-in-the-mountains.json": require("gatsby-module-loader?name=path---project-a-chairlift-in-the-mountains!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/project-a-chairlift-in-the-mountains.json"),
  "project-cable-car-peace.json": require("gatsby-module-loader?name=path---project-cable-car-peace!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/project-cable-car-peace.json"),
  "dev-404-page.json": require("gatsby-module-loader?name=path---dev-404-page!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/dev-404-page.json"),
  "404.json": require("gatsby-module-loader?name=path---404!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/404.json"),
  "about.json": require("gatsby-module-loader?name=path---about!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/about.json"),
  "index.json": require("gatsby-module-loader?name=path---index!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/index.json"),
  "404-html.json": require("gatsby-module-loader?name=path---404-html!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/404-html.json")
}

exports.layouts = {
  "layout---index": require("gatsby-module-loader?name=component---src-layouts-index-js!/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/layouts/index.js")
}