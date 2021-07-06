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
 * @param {string} [requirements.has] - Checks for this privilege
 * @param {string[]} [requirements.hasAll] - Checks for all privilege in this array
 * @param {string[]} [requirements.hasAny] - Checks for any privilege in this array
 * @param {string} [errorMessage] - Error message to show user in case requirement not met
 * @return {function(*, *, *): *} Privilege checker middleware
 */
const requirePrivilege = (requirements, errorMessage = '') => {
  const { has, hasAll, hasAny } = requirements || {};
  return async (req, res, next) => {
    let isAuthorized = true;
    const userAssignedPrivileges = getDistinctFrequency((req.user || {}).privilegeList || []);
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
