import { URL } from 'url';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();
let { env = {} } = process || {};

/**
 * @const env
 * @type {Object}
 */
env = {
  ...env,
  APP_NAME: env.APP_NAME,
  APP_ENV: env.APP_ENV || 'development',
  API_VERSION: env.API_VERSION || 'v1',
  API_PREFIX: `/api/${env.API_VERSION}`,
};

/**
 * @method isTypeOf
 * @param {*} varToCheck - variable to check its type
 * @param {string} type - The type to check against
 * @return {*|boolean} check - the strict type of a variable
 */
const isTypeOf = (varToCheck, type) =>
  varToCheck && {}.toString.call(varToCheck) === `[object ${type}]`;

/**
 * @method getDistinctFrequency
 * @param {Array | string} array - The port to normalize
 * @return {Object} Frequency counter
 */
const getDistinctFrequency = array => {
  const result = {};
  if (!(Array.isArray(array) || isTypeOf(array, 'String'))) {
    return result;
  }
  for (let i = 0; i < array.length; i += 1) {
    const current = array[i];
    result[current] = result[current] ? result[current] + 1 : 1;
  }
  return result;
};

/**
 * @method getEnv
 * @description get all the system environment variables
 * @returns {Object} Environment variables
 */
const getEnv = () => {
  return env;
};

/**
 * @method setEnv
 * @description set a new environment variable or update existing one
 * @param {Object} newEnv - The new environment variable(s) as object
 * @returns {null} Null
 */
const setEnv = newEnv => {
  if (isTypeOf(newEnv, 'Object')) {
    env = { ...env, ...newEnv };
  }
};

/**
 * @callback PaginationFunction
 * @param {string | number} [page=1] - page to query
 * @param {string | number} [limit=10] - limit for the query
 * @param {Object} [options] - Options for the model
 * @returns {{item_count: number, next_page: null, total: *, number_of_pages: number, limit: number, page: number, previous_page: (number|null), results: number | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}} Paginated data
 */

/**
 * @method paginate
 * @description Paginates model
 * @param {Object} model - model to add pagination to
 * @param {Function} [model.findAndCountAll] - inbuilt model function
 * @returns {PaginationFunction} Function to paginate the specified model
 */
const paginate = model => async (page, limit, options = {}) => {
  limit = parseInt(limit, 10) || 10;
  const p = Math.abs(parseInt(page, 10)) || 1;
  const offset = (p - 1) * limit;
  let result = await model.findAndCountAll({
    ...options,
    offset,
    limit,
  });
  const numberOfPages = Math.ceil(result.count / limit) || 1;
  result = {
    results: result.rows,
    item_count: result.rows.length,
    page: p,
    limit,
    total: result.count,
    number_of_pages: numberOfPages,
    previous_page: p > 1 ? Math.min(p - 1, numberOfPages) : null,
    next_page: p < numberOfPages ? p + 1 : null,
  };
  return result;
};

/**
 * @method removeFileExtension
 * @description To remove extension from a file
 * @param {string} fileName - The name of the file to remove its extension
 * @return {string|*} Name without extension
 */
const removeFileExtension = fileName => {
  if (fileName.includes('.')) {
    return fileName
      .split('.')
      .slice(0, -1)
      .join('.');
  }
  return fileName;
};

/**
 * @method isValidBase64Image
 * @description Check if a string is a valid base64
 * @param {string} base64 - the base 64 string
 * @return {string|*} If the string is base64 formatted
 */
const isValidBase64Image = base64 => {
  const base64Regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?';
  const mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)';
  return new RegExp(`${mimeRegex}?${base64Regex}`).test(base64);
};

/**
 * @method pickFromObject
 * @description To create a new object containing a specified key from an existing object
 * @param {Object} obj - object to pick key value pair from
 * @param {string[]} acceptedKeys - the keys to pick from the object
 * @return {{}|*} Newly created object
 */
const pickFromObject = (obj, acceptedKeys = []) => {
  if (!acceptedKeys || !acceptedKeys.length || !obj || !isTypeOf(obj, 'Object')) return obj;
  return acceptedKeys.reduce((p, c) => {
    if (obj[c] !== undefined) {
      p[c] = obj[c];
    }
    return p;
  }, {});
};

/**
 * @method discardFromObject
 * @description To create a new object that does not contain a specified key from an existing object
 * @param {Object} obj - Object to create from
 * @param {string[]} forbiddenKeys - the keys that should not exist in the new object
 * @return {{}|*} Newly created object
 */
const discardFromObject = (obj, forbiddenKeys = []) => {
  if (!forbiddenKeys || !forbiddenKeys.length || !obj || !isTypeOf(obj, 'Object')) return obj;
  const forbiddenKeysObj = getDistinctFrequency(forbiddenKeys);
  return Object.keys(obj).reduce((p, c) => {
    if (!forbiddenKeysObj[c]) p[c] = obj[c];
    return p;
  }, {});
};

/**
 * @method getBaseDomainFromUrl
 * @description To get base domain from a giving url
 * @param {string} url - The url to extract base domain from
 * @return {string} The base domain
 */
const getBaseDomainFromUrl = url => {
  if (!url) return url;
  const { hostname } = new URL(url);
  if ((hostname.match(/\./g) || []).length > 1) {
    const hostArr = hostname.split('.');
    return `${hostArr[hostArr.length - 2]}.${hostArr[hostArr.length - 1]}`;
  }
  return hostname;
};

/**
 * @method getCookieDomain
 * @description To get cookie domain
 * @param {Object} req - Express request object
 * @return {string} The base domain
 */
const getCookieDomain = req => {
  let domain = req.get('origin') || req.get('referer') || getEnv().APP_URL;
  domain = getBaseDomainFromUrl(domain);
  return domain;
};

/**
 * @method getTokensFromRequest
 * @description To get tokens from request
 * @param {Object} req - Express request object
 * @param {Object} [config] - key to find accessToken
 * @param {string} [config.accessTokenKey] - key to find accessToken
 * @param {string} [config.refreshTokenKey] - key to find accessToken
 * @return {{accessToken: string, refreshToken: string}} Token Object
 */
const getTokensFromRequest = (req, config = {}) => {
  const { accessTokenKey = '', refreshTokenKey = '' } = config || {};
  let { accessToken, refreshToken } = req.query;
  if (accessTokenKey) accessToken = req.query[accessTokenKey];
  if (refreshTokenKey) refreshToken = req.query[refreshTokenKey];
  if (!accessToken) {
    accessToken = req.get('Authorization');
    [, accessToken] = (accessToken || '').split(' ');
  }
  if (!accessToken) accessToken = req.cookies[accessTokenKey || 'accessToken'];
  if (!refreshToken) {
    refreshToken = req.get('X-REFRESH-TOKEN');
    [, refreshToken] = (refreshToken || '').split(' ');
  }
  if (!refreshToken) refreshToken = req.cookies[refreshTokenKey || 'refreshToken'];
  return { accessToken, refreshToken };
};

/**
 * @method setTokensToResponse
 * @description To set token to response
 * @param {Object} res - Express response object
 * @param {Object} tokens - The tokens to set
 * @param {string} [tokens.access] - The access token to set
 * @param {string} [tokens.refresh] - The access token to set
 * @param {Object} [config] - Other configurations
 * @param {string} [config.cookieDomain] - The domain to set the token cookies on
 * @param {string} [config.accessTokenKey] - The key to use for accessToken
 * @param {string} [config.refreshTokenKey] - The key to use for refreshToken
 * @param {number} [config.cookieLifeInDays] - The number of days before cookie expires
 * @return {string} Referer Url
 */
const setTokensToResponse = (res, tokens, config = {}) => {
  let { cookieDomain = '', accessTokenKey = '', refreshTokenKey = '', cookieLifeInDays } = config;
  cookieLifeInDays = cookieLifeInDays || parseInt(env.COOKIE_LIFE || '0', 10) || 14;
  const cookieLife = new Date(Date.now() + cookieLifeInDays * 24 * 60 * 60 * 1000);
  if (tokens.access) {
    res.cookie(accessTokenKey || 'accessToken', tokens.access, {
      domain: cookieDomain,
      expires: cookieLife,
    });
    res.set('Authorization', `Bearer ${tokens.access}`);
  }
  if (tokens.refresh) {
    res.cookie(refreshTokenKey || 'refreshToken', tokens.refresh, {
      domain: cookieDomain,
      expires: cookieLife,
    });
    res.set('X-REFRESH-TOKEN', `Bearer ${tokens.refresh}`);
  }
};

/**
 * @method normalizePort
 * @param {string | number} port - The port to normalize
 * @return {boolean|number|*} Normalized port
 */
const normalizePort = port => {
  const modifiedPort = parseInt(port, 10);
  if (Number.isNaN(port)) {
    return port;
  }
  if (modifiedPort >= 0) {
    return modifiedPort;
  }
  return false;
};

/**
 * @method updateQueryParams
 * @param {string} route
 * @param {Object} params
 * @param {string} [customIdentifier]
 * @returns {string} The updated url with the query params attached
 */
const updateQueryParams = (route, params = {}, customIdentifier = '') => {
  if (!isTypeOf(params, 'Object')) {
    return route;
  }
  let identifier = ['?', '&'];
  if (customIdentifier && !identifier.includes(customIdentifier)) {
    identifier = identifier.concat(customIdentifier);
  }
  Object.keys(params).forEach(key => {
    const value = params[key];
    const re = new RegExp(`([${identifier.join('')}])${key}=.*?(&|$)`, 'i');
    if (!(value === undefined || value === null || value === 'undefined')) {
      const separator = customIdentifier || (route.toString().indexOf('?') !== -1 ? '&' : '?');
      if (route.toString().match(re)) {
        route = route.toString().replace(re, `$1${key}=${value}$2`);
      } else {
        route = `${route + separator + key}=${value}`;
      }
    } else {
      route = route.toString().replace(re, '?');
    }
  });
  return route;
};

/**
 * @method base64Encode
 * @param {*} val
 * @param {boolean} [urlEncode]
 * @returns {string} The encoded string
 */
const base64Encode = (val, urlEncode = false) => {
  const buffer = Buffer.from(val);
  let base64Data = buffer.toString('base64');
  if (urlEncode) {
    base64Data = encodeURIComponent(base64Data);
  }
  return base64Data;
};

/**
 * @method base64Decode
 * @param {*} val
 * @param {boolean} [urlEncoded]
 * @returns {string} The decoded string
 */
const base64Decode = (val, urlEncoded = false) => {
  if (urlEncoded) {
    val = decodeURIComponent(val);
  }
  const buffer = Buffer.from(val, 'base64');
  return buffer.toString('ascii');
};

/**
 * @method convertToSlug
 * @param {string} text
 * @return {string|*} slug
 */
const convertToSlug = text => {
  if (!isTypeOf(text, 'String')) {
    return text;
  }
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export {
  getEnv,
  setEnv,
  isTypeOf,
  getCookieDomain,
  getTokensFromRequest,
  setTokensToResponse,
  removeFileExtension,
  discardFromObject,
  pickFromObject,
  paginate,
  getBaseDomainFromUrl,
  isValidBase64Image,
  normalizePort,
  getDistinctFrequency,
  updateQueryParams,
  base64Encode,
  base64Decode,
  convertToSlug,
};
