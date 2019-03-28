const dotenvLoad = require('dotenv-load');

const modules = [
  require('next-env')(),
  require('@zeit/next-css'),
  require('@zeit/next-sass'),
  require('@zeit/next-typescript'),
];

dotenvLoad();

const applyModules = configs => modules.reduce((r, v) => v(r), configs);

module.exports = applyModules({
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
