import { logger } from '../helpers/logger';
import { CustomError } from '../helpers/errors';

/**
 * @method errorHandler
 * @param {boolean} [includeStackTrace] - Whether or not to include stack trace
 * @returns {function(Error, Object, Object, Function): JSON} Express middleware function
 */
const errorHandler = (includeStackTrace = false) => (error, req, res, next) => {
  if (!(error instanceof CustomError)) {
    error = error || {};
    error = new CustomError(error.message, { stackTrace: error.stack });
  }
  if (error.code === 500) {
    try {
      logger.log({
        level: 'error',
        method: req.method,
        url: req.url,
        clientInfo: req.headers['user-agent'],
        user: (req.user || {}).id,
        status: res.statusCode || error.code,
        statusMessage: error.message,
        error: error.stack,
      });
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  return res.status(error.code).json(error.serializeError(includeStackTrace));
};

export { errorHandler };
