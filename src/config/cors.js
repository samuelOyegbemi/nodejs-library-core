/**
 * @typedef {Object} CorsOptions
 * @property {boolean} credentials - The cors credentials.
 * @property {string[]} exposedHeaders - The headers to expose
 * @property {function(string, Function):*} origin - The origin function
 */

/**
 * @method corsOptions
 * @param {Object} config - the cors configuration
 * @param {string[]} [config.whitelist] - Array of url to whitelist
 * @param {RegExp[]} [config.whitelistRegEx] - Array of url to whitelist using matching
 * @param {string} config.appURL - The application url
 * @param {Array} [config.exposedHeaders] - The application url
 * @returns {CorsOptions} Cors Option
 */
const corsOptions = config => {
  const { whitelist, appURL, whitelistRegEx, exposedHeaders = ['Content-Length'] } = config;
  return {
    credentials: true,
    origin: (origin, callback) => {
      let valid;
      if (origin === undefined) {
        origin = appURL;
      }
      if (whitelist && Array.isArray(whitelist) && whitelist.indexOf(origin) !== -1) {
        valid = true;
      }
      if (whitelistRegEx && Array.isArray(whitelistRegEx)) {
        valid = whitelistRegEx.some(
          wRE => ({}.toString.call(wRE) === '[object RegExp]' && wRE.test(origin)),
        );
      }
      if (valid) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    exposedHeaders: [...exposedHeaders, 'Authorization', 'X-REFRESH-TOKEN'],
  };
};

// eslint-disable-next-line import/prefer-default-export
export { corsOptions };
