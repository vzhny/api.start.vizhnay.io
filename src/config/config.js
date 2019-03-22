import dotenv from 'dotenv';

dotenv.config({ silent: true });

const env = process.env.NODE_ENV;

switch (env) {
  case 'development':
    process.env.PG_CONNECT_STRING = process.env.PG_CONNECT_STRING_DEV;
    process.env.JWT_SECRET = process.env.JWT_SECRET_DEV;
    process.env.PG_DB_NAME = process.env.PG_DB_NAME_DEV;
    break;
  case 'test':
    process.env.PG_CONNECT_STRING = process.env.PG_CONNECT_STRING_TEST;
    process.env.JWT_SECRET = process.env.JWT_SECRET_TEST;
    process.env.PG_DB_NAME = process.env.PG_DB_NAME_TEST;
    break;
  default:
    break;
}
