# Gatsby Cockpit Advanced Layout

Example project to use Cockpit layout field with custom components in Gatsby. You can find some more on [my Medium Post](https://medium.com/@pierreberchtold/gatsby-cockpit-layout-field-e908f4dbd87b) based on this project.

## The Scope

- [GatsbyJS](https://www.gatsbyjs.org/): a Blazing-fast static site generator for React
- [Cockpit Headless CMS](https://getcockpit.com): a self-hosted headless and api-driven CMS
- The Project: a simple portfolio page with pages and projects.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Cockpit

1. Run a PHP server on the `cockpit` folder.
2. Go to [http://localhost/install](http://localhost/install) (if Cockpit is running on localhost)
3. Generate a new [API Key](https://getcockpit.com/documentation/api/token)
4. Replace the API Key to gatsby-config.js

## Website

### Installation

```
npm install
```

### Development

```
npm run develop
```

### Production

```
npm run build
```