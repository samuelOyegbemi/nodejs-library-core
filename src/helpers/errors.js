/**
 * @class CustomError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.httpStatusCode]
 * @param {string} [config.stackTrace]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function CustomError(message, config) {
  config = config || {};
  this.message = message || 'Oops something went wrong';
  this.stack = config.stackTrace || Error().stack;
  this.code = config.httpStatusCode || 500;
  this.subCode = config.subCode || 0;
  this.errorReason = config.reason;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.name = 'CustomError';
CustomError.prototype.serializeError = function serializeError(includeStackTrace = false) {
  const serialized = {
    status: 'FAIL',
    statusCode: this.code,
    subCode: this.subCode,
    data: {
      reason: this.errorReason,
    },
    message: this.message,
  };
  if (includeStackTrace) {
    serialized.data.stackTrace = this.stack;
  }
  return serialized;
};

/**
 * @class RequestValidationError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function RequestValidationError(message, config) {
  message = message || 'Invalid data';
  CustomError.apply(this, [message, config]);
  this.code = 400;
}
RequestValidationError.prototype = Object.create(CustomError.prototype);
RequestValidationError.prototype.name = 'RequestValidationError';

/**
 * @class AuthenticationError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function AuthenticationError(message, config) {
  message = message || 'Authentication required';
  CustomError.apply(this, [message, config]);
  this.code = 401;
}
AuthenticationError.prototype = Object.create(CustomError.prototype);
AuthenticationError.prototype.name = 'AuthenticationError';

/**
 * @class AuthorizationError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function AuthorizationError(message, config) {
  message = message || 'You do not have enough permission to this resource';
  CustomError.apply(this, [message, config]);
  this.code = 403;
}
AuthorizationError.prototype = Object.create(CustomError.prototype);
AuthorizationError.prototype.name = 'AuthorizationError';

/**
 * @class NotFoundError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function NotFoundError(message, config) {
  message = message || 'Resource not found';
  CustomError.apply(this, [message, config]);
  this.code = 404;
}
NotFoundError.prototype = Object.create(CustomError.prototype);
NotFoundError.prototype.name = 'NotFoundError';

/**
 * @class ConflictError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function ConflictError(message, config) {
  message = message || 'Conflict';
  CustomError.apply(this, [message, config]);
  this.code = 409;
}
ConflictError.prototype = Object.create(CustomError.prototype);
ConflictError.prototype.name = 'ConflictError';

export {
  CustomError,
  RequestValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
};
