module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-cockpit`,
      options: {
        cockpitConfig: {
          baseURL: 'http://cockpit.portfolio.local', // the url to you cockpit installation
          accessToken: '6253b3ebb626ba3900d124422e6916', // you cockpit API key
        },
      },
    },
  ],
};
