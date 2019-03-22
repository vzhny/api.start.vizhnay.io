import serverTests from '@/tests/server.test';
import userTests from '@/tests/users.test';
import { rollbackAndMigrate, disconnectFromDatabase } from '@/db/database';

/* eslint-disable jest/valid-describe */
beforeAll(() => rollbackAndMigrate());

afterAll(() => disconnectFromDatabase());

describe('Server Tests', serverTests);
describe('User Tests', userTests);
