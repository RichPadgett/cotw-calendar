/*
 * File: babel.config.js
 * Purpose: JavaScript configuration or utility script.
 */

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
  };
};
