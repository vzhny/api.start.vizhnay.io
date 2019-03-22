import { knexSnakeCaseMappers } from 'objection';

const client = 'pg';
const connection = process.env.PG_CONNECT_STRING;
const migrations = { directory: `${__dirname}/src/db/migrations` };
const seeds = { directory: `${__dirname}/src/db/seeds` };

module.exports = {
  development: {
    client,
    connection,
    migrations,
    seeds,
    ...knexSnakeCaseMappers(),
  },
  test: {
    client,
    connection,
    migrations,
    ...knexSnakeCaseMappers(),
  },
  production: {
    client,
    connection,
    pool: {
      min: 1,
      max: 1,
    },
    migrations,
    ...knexSnakeCaseMappers(),
  },
};
