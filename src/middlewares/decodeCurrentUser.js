import { jwt } from '../helpers/jwt';
import { getTokensFromRequest } from '../helpers';

/**
 * @method decodeCurrentUser
 * @param {string} [accessTokenKey=accessToken] - The accessToken key
 * @param {string} [refreshTokenKey=refreshToken] - The accessToken key
 * @returns {function(Error, Object, Object, Function): JSON} Express middleware function
 */
const decodeCurrentUser = (accessTokenKey = '', refreshTokenKey = '') => async (req, res, next) => {
  const { accessToken } = getTokensFromRequest(req, { accessTokenKey, refreshTokenKey });
  try {
    req.user = await jwt.verifyToken(accessToken, false);
  } catch (e) {
    req.errorDetail = e;
  }
  next();
};

export { decodeCurrentUser };
