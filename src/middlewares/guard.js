import { AuthenticationError } from '../helpers/errors';

/**
 * @method requireAuthentication
 * @param {string} [message] - The message to display to user
 * @returns {function(Error, Object, Object, Function): JSON} Express middleware function
 */
const requireAuthentication = (message = '') => (req, res, next) => {
  let error;
  if (!(req.user || {}).id) {
    error = message || !req.errorDetail ? new AuthenticationError(message) : req.errorDetail;
    throw error;
  }
  return next();
};

export { requireAuthentication };
