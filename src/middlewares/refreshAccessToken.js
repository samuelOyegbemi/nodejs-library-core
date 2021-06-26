import { jwt } from '../helpers/jwt';
import { getTokensFromRequest, setTokensToResponse, getCookieDomain } from '../helpers';

/**
 * @method refreshAccessToken
 * @param {Object} [config] - Configuration object
 * @param {string} [config.accessTokenKey] - key to find accessToken
 * @param {string} [config.refreshTokenKey] - key to find refreshToken
 * @param {boolean} [config.forceRefreshEvenIfNotExpire] - Whether or not to refresh even if the token has not yet expired
 * @param {RefreshTokenGetUser} config.getUser - Function to get user data
 * @returns {function(Object, Object, Function): null} Middleware to refresh accessToken
 */
const refreshAccessToken = config => async (req, res, next) => {
  const { forceRefreshEvenIfNotExpire = false, getUser } = config || {};
  const { refreshToken } = getTokensFromRequest(req, {
    refreshTokenKey: config.refreshTokenKey,
    accessTokenKey: config.accessTokenKey,
  });
  if (forceRefreshEvenIfNotExpire || (req.errorDetail && req.errorDetail.subCode === 1)) {
    try {
      const [newToken, user] = await jwt.renewAccessToken(refreshToken, getUser);
      setTokensToResponse(res, { access: newToken }, { cookieDomain: getCookieDomain(req) });
      req.newAccessToken = newToken;
      req.refreshToken = refreshToken;
      req.user = user;
    } catch (e) {
      req.errorDetail = e;
    }
  }
  next();
};

export { refreshAccessToken };
