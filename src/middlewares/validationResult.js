import { validationResult as vRes } from 'express-validator';
import { RequestValidationError } from '../helpers/errors';

/**
 * @method validationResult
 * @param {string} [message] General error message to return
 * @return {function(Object, Object, Function): null} Middleware to update documentation properties
 */
const validationResult = message => (req, res, next) => {
  const errors = vRes(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(message || 'Invalid request data', { reason: errors });
  }
  next();
};

export { validationResult };
