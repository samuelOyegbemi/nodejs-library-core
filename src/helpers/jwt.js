import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { AuthenticationError, CustomError } from './errors';
import { isTypeOf } from './index';

/**
 * @callback RefreshTokenGetUser
 * @description To get user data to be used to regenerate token
 * @param {string} id
 * @returns {Object} the user
 */

/**
 * @export
 * @namespace jwt
 * */
const jwtHelper = {};

/**
 * @method makeToken
 * @description To generate a jwt
 * @param {Object} user - The user to create a token for
 * @param {string} [lifeSpan] - The lifespan of the token to be created
 * @memberOf jwt
 * @returns {undefined|string} The generated token string
 */
jwtHelper.makeToken = (user, lifeSpan = jwtConfig.ACCESS_TOKEN_LIFESPAN) =>
  jwt.sign(user, jwtConfig.SECRET_KEY, { expiresIn: lifeSpan });

/**
 * @method verifyToken
 * @description To verify a given jwt
 * @param {String} token - the access token string
 * @param {Boolean} [includeSignature=true] - Whether or not to include signature
 * @memberOf jwt
 * @return {Object} the user object
 */
jwtHelper.verifyToken = (token, includeSignature = true) => {
  if (!token) {
    throw new AuthenticationError('Unauthorized: token not found!');
  }
  let user;
  if (!jwtConfig.SECRET_KEY) {
    throw new Error(`APP_KEY environment variable is required!`);
  }
  return jwt.verify(token, jwtConfig.SECRET_KEY, (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          throw new AuthenticationError('Unauthorized: Supplied token has expired!', {
            subCode: 1,
          });
        case 'JsonWebTokenError':
          throw new AuthenticationError('Unauthorized: Supplied token is invalid!');
        default:
          break;
      }
      throw new AuthenticationError('Unauthorized: token not found!');
    }
    user = decoded;
    if (!!user && !includeSignature) {
      delete user.iat; // Delete the issuedAt field
      delete user.exp; // Delete the expireAt field
    }
    return user;
  });
};

/**
 * @method generateTokens
 * @description To generate both access and refresh token for a given user
 * @param {Object} user - The user to generate tokens for
 * @memberOf jwt
 * @returns {{access: string, refresh: string}} The generated token object containing access token and refresh token
 */
jwtHelper.generateTokens = user => {
  const access = jwtHelper.makeToken(user);
  const refresh = jwtHelper.makeToken({ id: user.id }, jwtConfig.REFRESH_TOKEN_LIFESPAN);
  return { access, refresh };
};

/**
 * @method renewAccessToken
 * @description To get new access token from a refresh token
 * @param {string} refreshToken - the refresh token
 * @param {RefreshTokenGetUser | Function} getUser - Function to get user
 * @memberOf jwt
 * @returns {Promise<Array>} The new access token and the user data
 */
jwtHelper.renewAccessToken = async (refreshToken, getUser) => {
  if (!refreshToken) {
    throw new AuthenticationError('Invalid arguments: provide user and refresh token', {
      subCode: 2,
    });
  }
  let user;
  const decodedUser = await jwtHelper.verifyToken(refreshToken, false);
  if (isTypeOf(getUser, 'Function') && decodedUser && decodedUser.id) {
    user = getUser(decodedUser.id);
  }
  if (isTypeOf(getUser, 'AsyncFunction') && decodedUser && decodedUser.id) {
    user = await getUser(decodedUser.id);
  }
  if (!user) {
    throw new CustomError('Unable to refresh token: could not read user detail');
  }
  if (decodedUser && decodedUser.id) {
    const token = jwtHelper.makeToken(user);
    return [token, user];
  }
  throw new AuthenticationError('Invalid refreshToken: supplied token is invalid', {
    subCode: 3,
  });
};

export { jwtHelper };
