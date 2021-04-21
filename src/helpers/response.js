/**
 * @method renderResponse
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {String} template - Http status code for the response
 * @param {Object} [data] - Data to be return as part of response body
 * @param {Number} [statusCode=200] - Http status code for the response
 * @returns {HTMLDocument} Full html content
 */
const renderResponse = (req, res, template, data = {}, statusCode = 200) => {
  return res.status(statusCode).render(template, data);
};

/**
 * @method successResponse
 * @param {object} res - Express response object
 * @param {Number} statusCode - Http status code for the response
 * @param {object} [data] - Data to be return as part of response body
 * @param {String} [message] - Message accompanying the response data
 * @returns {JSON} Formatted JSON server response
 */
const successResponse = (res, statusCode, data = {}, message = 'Success') =>
  res.status(statusCode).json({ status: 'OK', statusCode, data, message });

/**
 * @method okResponse
 * @param {object} res - Express response object
 * @param {object} [data] - Data to be return as part of response body
 * @param {String} [message] - Message accompanying the response data
 * @returns {JSON} Formatted JSON server response
 */
const okResponse = (res, data, message = 'Ok') => successResponse(res, 200, data, message);

/**
 * @method createdResponse
 * @param {object} res - Express response object
 * @param {object} data - Data to be return as part of response body
 * @param {String} [message] - Message accompanying the response data
 * @returns {JSON} Formatted JSON server response
 */
const createdResponse = (res, data, message = 'New resource has been created') =>
  successResponse(res, 201, data, message);

/**
 * @method redirectResponse
 * @param {object} res - Express response object
 * @param {String} url - url to redirect to
 * @param {Number} [code] - 301 or 302 based on permanent or temporary
 * @returns {Null} Null
 */
const redirectResponse = (res, url, code = 302) => res.status(code).redirect(url);

export { okResponse, renderResponse, successResponse, createdResponse, redirectResponse };
