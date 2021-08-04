import { body as bodyVal, param as paramVal, query as queryVal } from 'express-validator';
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
 * @typedef {Object} ValidatorInstance
 * @property {CustomValidator} email
 * @property {CustomValidator} password
 * @property {CustomConfirmValidator} confirm
 * @property {CustomMatchPatterValidator} matchPattern
 * @property {CustomRequiredValidator} required
 * */

const callee = { bodyVal, paramVal, queryVal };

/**
 * @ignore
 * @param {string} location
 * @return {*} Validator Instance
 * */
const getValidator = location => {
  return {
    email: (fieldName = 'email', message = '') =>
      callee[`${location}Val`](fieldName)
        .matches(regExp.EMAIL)
        .withMessage(message || `[${fieldName}] Invalid email field in req.${location}`),
    password: (fieldName = 'password', message = '') =>
      callee[`${location}Val`](fieldName)
        .matches(regExp.PASSWORD)
        .withMessage(
          message ||
            `[${fieldName}], Password field must contain at least one` +
              `uppercase, one lowercase and one number in req.${location}`,
        ),
    confirm: (fieldName = 'confirm_password', benchmark = 'password', message = '') =>
      callee[`${location}Val`](fieldName).custom(async (confirmPassword, { req }) => {
        const benchmarkValue = req[location][benchmark] || '';
        if (benchmarkValue !== confirmPassword) {
          throw new Error(
            message || `[${fieldName}] must match with [${benchmark}] in req.${location}`,
          );
        }
      }),
    matchPattern: (fieldName, pattern, message = '') =>
      callee[`${location}Val`](fieldName).custom(async fieldValue => {
        if ({}.toString.call(pattern) === '[object RegExp]' && !pattern.test(fieldValue)) {
          throw new Error(message || `[${fieldName}] must match pattern test in req.${location}`);
        }
      }),
    required: (...fieldNames) =>
      fieldNames.map(f =>
        callee[`${location}Val`](f)
          .notEmpty()
          .withMessage(`[${f}] is required in req.${location}`),
      ),
  };
};

/**
 * @namespace validator
 * */
const validator = {};

/**
 * @type {ValidatorInstance}
 * @memberOf validator
 */
validator.body = getValidator('body');

/**
 * @type {ValidatorInstance}
 * @memberOf validator
 */
validator.param = getValidator('param');

/**
 * @type {ValidatorInstance}
 * @memberOf validator
 */
validator.query = getValidator('query');

export { validator };
