import { getEnv } from '../helpers';

const env = getEnv();

/**
 * @const jwtConfig
 * @property {string} ACTIVATION_TOKEN_LIFESPAN
 * @property {string} SECRET_KEY
 * @property {string} ACCESS_TOKEN_LIFESPAN
 * @property {string} REFRESH_TOKEN_LIFESPAN
 */
export const jwtConfig = {
  SECRET_KEY: env.APP_KEY,
  ACTIVATION_TOKEN_LIFESPAN: env.ACTIVATION_TOKEN_LIFESPAN || '6h',
  ACCESS_TOKEN_LIFESPAN: env.ACCESS_TOKEN_LIFESPAN || '1h',
  REFRESH_TOKEN_LIFESPAN: env.REFRESH_TOKEN_LIFESPAN || '7d',
};
