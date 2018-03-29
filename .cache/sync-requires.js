// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-templates-project-js": preferDefault(require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/templates/project.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/pages/404.js")),
  "component---src-pages-about-js": preferDefault(require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/pages/about.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/layout-index.json"),
  "project-summer-escape.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/project-summer-escape.json"),
  "project-a-chairlift-in-the-mountains.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/project-a-chairlift-in-the-mountains.json"),
  "project-cable-car-peace.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/project-cable-car-peace.json"),
  "dev-404-page.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/dev-404-page.json"),
  "404.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/404.json"),
  "about.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/about.json"),
  "index.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/index.json"),
  "404-html.json": require("/Users/Pierre/Dev/gatsby-cockpit-advanced-layout/.cache/json/404-html.json")
}