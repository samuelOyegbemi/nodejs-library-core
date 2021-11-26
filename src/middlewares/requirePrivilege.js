import { getDistinctFrequency, isTypeOf } from '../helpers/utility';
import { AuthorizationError } from '../helpers/errors';

// eslint-disable-next-line require-jsdoc
const checkPrivilege = (privilege, assignedPrivileges) => {
  if (isTypeOf(privilege, 'String')) {
    return !!assignedPrivileges[privilege];
  }
  if (isTypeOf(privilege, 'Function')) {
    return privilege(assignedPrivileges);
  }
  return false;
};

/**
 * @method requirePrivilege
 * @param {Object} requirements - The requirements
 * @param {string | function(*):string} [requirements.has] - Checks for this privilege
 * @param {string[] | function(*):string[]} [requirements.hasAll] - Checks for all privilege in this array
 * @param {string[] | function(*):string[]} [requirements.hasAny] - Checks for any privilege in this array
 * @param {Object} [config] - other configurations
 * @param {string} [config.errorMessage] - Error message to show user in case requirement not met
 * @param {string} [config.privilegeKey=privilegeList] - Key to check privilege list in req.user
 * @return {function(*, *, *): *} Privilege checker middleware
 */
const requirePrivilege = (requirements, config = {}) => {
  if (typeof config !== 'object') config = {};
  const { errorMessage = '', privilegeKey = 'privilegeList' } = config;
  let { has, hasAll, hasAny } = requirements || {};
  return async (req, res, next) => {
    if (has && typeof has === 'function') {
      has = await has(req);
    }
    if (hasAll && typeof hasAll === 'function') {
      hasAll = await hasAll(req);
    }
    if (hasAny && typeof hasAny === 'function') {
      hasAny = await hasAny(req);
    }
    let isAuthorized = true;
    const userAssignedPrivileges = getDistinctFrequency((req.user || {})[privilegeKey] || []);
    if (has) {
      isAuthorized = isAuthorized && checkPrivilege(has, userAssignedPrivileges);
    }
    if (hasAll && Array.isArray(hasAll) && hasAll.length) {
      isAuthorized =
        isAuthorized &&
        hasAll.every(privilege => checkPrivilege(privilege, userAssignedPrivileges));
    }
    if (hasAny && Array.isArray(hasAny) && hasAny.length) {
      isAuthorized =
        isAuthorized && hasAny.some(privilege => checkPrivilege(privilege, userAssignedPrivileges));
    }
    if (!isAuthorized) {
      throw new AuthorizationError(errorMessage);
    }
    return next();
  };
};

export { requirePrivilege };
