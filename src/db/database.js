import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '_root/knexfile';

/* eslint-disable no-unused-vars */

const env = process.env.NODE_ENV;
const dbName = process.env.PG_DB_NAME;
let config = {};

switch (env) {
  case 'development':
    config = { ...knexConfig.development };
    break;
  case 'test':
    config = { ...knexConfig.test };
    break;
  default:
    config = { ...knexConfig.production };
    break;
}

// Initializing knex with the appropriate config
const knex = Knex(config);

// Linking objection models to knex, globally
Model.knex(knex);

// Check for a successful connection
knex
  .select(1)
  .then(result => console.log(`Successfully connected to ${dbName}.`))
  .catch(error => console.log(`There was an error connecting to ${dbName}.`, error));

// Rolling back, migrating, and seeding (only in development) the database
const rollbackAndMigrate = async () => {
  try {
    await knex.migrate.rollback();
    await knex.migrate.latest();

    if (env === 'development') {
      await knex.seed.run();

      console.log('Successfully seeded the database.');
    }
  } catch (error) {
    console.log('An error occurred when rolling back, migrating, or seeding the database.', error);
  }
};

// Disconnecting from the database
const disconnectFromDatabase = async (message = `Sucessfully disconnected from ${dbName}.`) => {
  try {
    await knex.destroy();

    console.log(`\n${message}`);

    if (env !== 'test') {
      // Graceful termination to release the port
      process.exit(0);
    }
  } catch (error) {
    console.log(`There was an error disconnecting from ${dbName}.`, error);
  }
};

/* Process watchers  */

// Listening for ctrl+c app termination from terminal
process.on('SIGINT', async () => {
  await disconnectFromDatabase(`Successfully disconnected from ${dbName} via SIGINT.`);
});

// Listening for app termination from process
process.on('SIGTERM', async () => {
  await disconnectFromDatabase(`Successfully disconnected from ${dbName} via SIGTERM).`);
});

// Listening (once) for nodemon restart
process.once('SIGUSR2', async () => {
  await disconnectFromDatabase(`Successfully disconnected from ${dbName} via SIGUSR2.`);
});

if (env !== 'test') {
  rollbackAndMigrate();
}

export { rollbackAndMigrate, disconnectFromDatabase };
