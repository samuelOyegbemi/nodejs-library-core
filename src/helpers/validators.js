import { body, param, query } from 'express-validator';
import { regExp } from '../config/regExp';

/**
 * @callback CustomValidator
 * @param {string} [fieldName] - The field to validate
 * @param {string} [message] - Error message
 * @return {*} Validation chain
 */

/**
 * @callback CustomConfirmValidator
 * @param {string} [fieldName] - The field to validate
 * @param {string} [benchmark] - What to benchmark against
 * @param {string} [message] - Error message
 * @return {*} Validation chain
 */

/**
 * @callback CustomMatchPatterValidator
 * @param {string} fieldName - The field to validate
 * @param {RegExp} pattern - pattern to test for
 * @param {string} [message] - Error message
 * @return {*} Validation chain
 */

/**
 * @callback CustomRequiredValidator
 * @param {...string} fieldNames - Name of the required field(s)
 * @return {Array} Validation chain
 */

/**
 * @const bodyValidator
 * @property {CustomValidator} email
 * @property {CustomValidator} password
 * @property {CustomConfirmValidator} confirm
 * @property {CustomMatchPatterValidator} matchPattern
 * @property {CustomRequiredValidator} required
 */
const bodyValidator = {
  email: (fieldName = 'email', message = '') =>
    body(fieldName)
      .matches(regExp.EMAIL)
      .withMessage(message || `[${fieldName}] Invalid email field`),
  password: (fieldName = 'password', message = '') =>
    body(fieldName)
      .matches(regExp.PASSWORD)
      .withMessage(
        message ||
          `[${fieldName}], Password field must contain at least one uppercase, one lowercase and one number`,
      ),
  confirm: (fieldName = 'confirm_password', benchmark = 'password', message = '') =>
    body(fieldName).custom(async (confirmPassword, { req }) => {
      const benchmarkValue = req.body[benchmark] || '';
      if (benchmarkValue !== confirmPassword) {
        throw new Error(message || `[${fieldName}] must match with [${benchmark}]`);
      }
    }),
  matchPattern: (fieldName, pattern, message = '') =>
    body(fieldName).custom(async fieldValue => {
      if ({}.toString.call(pattern) === '[object RegExp]' && !pattern.test(fieldValue)) {
        throw new Error(message || `[${fieldName}] must match pattern test`);
      }
    }),
  required: (...fieldNames) =>
    fieldNames.map(f =>
      body(f)
        .notEmpty()
        .withMessage(`[${f}] is required`),
    ),
};

/**
 * @method getValidator
 * @param {Function} fx
 * @param {string} location
 * @returns {{matchPattern: (function(*=, *=, *=): any), required: (function(...[*]): any[])}} Validator Object
 */
const getValidator = (fx, location) => {
  return {
    matchPattern: (fieldName, pattern, message = '') =>
      fx(fieldName).custom(async fieldValue => {
        if ({}.toString.call(pattern) === '[object RegExp]' && !pattern.test(fieldValue)) {
          throw new Error(message || `[${fieldName}] must match pattern test in ${location}`);
        }
      }),
    required: (...fieldNames) =>
      fieldNames.map(f =>
        fx(f)
          .notEmpty()
          .withMessage(`[${f}] is required in ${location}`),
      ),
  };
};

/**
 * @const paramValidator
 * @property {CustomMatchPatterValidator} matchPattern
 * @property {CustomRequiredValidator} required
 */
const paramValidator = getValidator(param, 'req.param');

/**
 * @const queryValidator
 * @property {CustomMatchPatterValidator} matchPattern
 * @property {CustomRequiredValidator} required
 */
const queryValidator = getValidator(query, 'req.query');

export { bodyValidator, paramValidator, queryValidator };
