import * as dotenv from 'dotenv';

dotenv.config();

export default {
  AUTH0_ISSUER_URL: process.env.AUTH0_ISSUER_URL,
  AUTH0_OAUTH_TOKEN_URL: process.env.AUTH0_OAUTH_TOKEN_URL,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  GRANT_TYPE: process.env.GRANT_TYPE,
  DATABASE_URL: process.env.DATABASE_URL,
};
