/**
 * @namespace response
 * */
const response = {};

/**
 * @method render
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {String} template - Http status code for the response
 * @param {Object} [data] - Data to be return as part of response body
 * @param {Number} [statusCode=200] - Http status code for the response
 * @memberOf response
 * @returns {HTMLDocument} Full html content
 */
response.render = (req, res, template, data = {}, statusCode = 200) => {
  return res.status(statusCode).render(template, data);
};

/**
 * @method success
 * @param {object} res - Express response object
 * @param {Number} statusCode - Http status code for the response
 * @param {object} [data] - Data to be return as part of response body
 * @param {String} [message] - Message accompanying the response data
 * @memberOf response
 * @returns {JSON} Formatted JSON server response
 */
response.success = (res, statusCode, data = {}, message = 'Success') =>
  res.status(statusCode).json({ status: 'OK', statusCode, data, message });

/**
 * @method ok
 * @param {object} res - Express response object
 * @param {object} [data] - Data to be return as part of response body
 * @param {String} [message] - Message accompanying the response data
 * @memberOf response
 * @returns {JSON} Formatted JSON server response
 */
response.ok = (res, data, message = 'Ok') => response.success(res, 200, data, message);

/**
 * @method created
 * @param {object} res - Express response object
 * @param {object} data - Data to be return as part of response body
 * @param {String} [message] - Message accompanying the response data
 * @memberOf response
 * @returns {JSON} Formatted JSON server response
 */
response.created = (res, data, message = 'New resource has been created') =>
  response.success(res, 201, data, message);

/**
 * @method redirect
 * @param {object} res - Express response object
 * @param {String} url - url to redirect to
 * @param {Number} [code] - 301 or 302 based on permanent or temporary
 * @memberOf response
 * @returns {Null} Null
 */
response.redirect = (res, url, code = 302) => res.status(code).redirect(url);

export { response };
