import util from 'util';

/**
 * @class BaseError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.httpStatusCode]
 * @param {string} [config.stackTrace]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function BaseError(message, config) {
  config = config || {};
  if (config.stackTrace) {
    this.stack = config.stackTrace;
  }
  this.message = message || 'Oops something went wrong';
  this.code = config.httpStatusCode || 500;
  this.subCode = config.subCode || 0;
  this.errorReason = config.reason;
}
util.inherits(BaseError, Error);
BaseError.prototype.name = 'BaseError';
BaseError.prototype.getErrorData = function getErrorData() {
  return {
    reason: this.errorReason,
    message: this.message,
    name: this.name,
  };
};
BaseError.prototype.serializeError = function serializeError(includeStackTrace = false) {
  const serialized = {
    status: 'FAIL',
    statusCode: this.code,
    subCode: this.subCode,
    data: this.getErrorData(),
    message: this.message,
  };
  if (includeStackTrace) {
    serialized.data.stackTrace = this.stack;
  }
  return serialized;
};

/**
 * @class CustomError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.httpStatusCode]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function CustomError(message, config) {
  BaseError.apply(this, [message, config]);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, CustomError);
  }
}
util.inherits(CustomError, BaseError);
CustomError.prototype.name = 'CustomError';

/**
 * @class BadRequestError
 * @param {string} message
 * @param {Object} [config]
 * @param {number} [config.subCode]
 * @param {*} [config.reason]
 * @constructor
 */
function BadRequestError(message, config) {
  message = message || 'Bad Request';
  BaseError.apply(this, [message, { ...config, httpStatusCode: 400 }]);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, BadRequestError);
  }
}
util.inherits(BadRequestError, BaseError);
BadRequestError.prototype.name = 'BadRequestError';

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
  BaseError.apply(this, [message, { ...config, httpStatusCode: 401 }]);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, AuthenticationError);
  }
}
util.inherits(AuthenticationError, BaseError);
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
  BaseError.apply(this, [message, { ...config, httpStatusCode: 403 }]);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, AuthorizationError);
  }
}
util.inherits(AuthorizationError, BaseError);
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
  BaseError.apply(this, [message, { ...config, httpStatusCode: 404 }]);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, NotFoundError);
  }
}
util.inherits(NotFoundError, BaseError);
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
  BaseError.apply(this, [message, { ...config, httpStatusCode: 409 }]);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ConflictError);
  }
}
util.inherits(ConflictError, BaseError);
ConflictError.prototype.name = 'ConflictError';

export {
  CustomError,
  BaseError,
  BadRequestError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
};
