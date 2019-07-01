const withConfig = require('next-runtime-dotenv')({
  public: [
    'PORTFOLIO_GRAPHQL_URL',
    'PORTFOLIO_OAUTH_URL',
    'GOOGLE_ANALYTICS_KEY',
    'GITHUB_OAUTH_CLIENT_ID',
  ],
});

const modules = [
  require('@zeit/next-css'),
  require('@zeit/next-sass'),
  require('@zeit/next-typescript'),
  require('next-env')(),
  withConfig,
];

const applyModules = configs => modules.reduce((r, v) => v(r), configs);

module.exports = applyModules({
  distDir: 'build',
  webpack: config => {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) entries['main.js'].unshift('./polyfills.js');

      return entries;
    };

    return config;
  },
});
