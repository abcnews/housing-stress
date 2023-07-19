const path = require('path');
module.exports = {
  webpack: config => {
    // De-dupe svelte
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      svelte: path.resolve('node_modules', 'svelte')
    };

    config.resolve.conditionNames = ['svelte', 'browser', 'import'];
    return config;
  }
};
