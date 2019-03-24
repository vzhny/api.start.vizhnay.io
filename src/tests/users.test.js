import request from 'supertest';
import app from '@/app';
import server from '@/server';

/* eslint-disable no-unused-expressions */

beforeEach(() => {
  server.close();
});

const userTests = () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async done => {
      const userInformation = {
        email: 'rosa@bk99.gov',
        password: '1000pushups',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        const { email, jwt } = body;

        expect(status).toEqual(201);
        expect(email).toEqual('rosa@bk99.gov');
        expect(jwt).toBeTruthy();

        done();
      } catch (error) {
        const { message } = error;
        done(message);
      }
    });

    it('should fail the registration of an email already in use', async done => {
      const userInformation = {
        email: 'jake@bk99.gov',
        password: 'forgot_my_password_lol',
      };

      try {
        const { status } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        expect(status).toEqual(500);

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should enforce a password minimum length of 6 characters', async done => {
      const userInformation = {
        email: 'captain_holt@bk99.gov',
        password: 'kevin',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        const { message } = body;

        expect(status).toEqual(400);
        expect(message).toEqual('Please enter a password with a length of 6 or more characters.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });

  describe('POST /api/auth/login', () => {
    it("should respond with the user's email and auth token after successfully logging in", async done => {
      const userInformation = {
        email: 'amy@bk99.gov',
        password: 'I_love_Jake',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { email, jwt } = body;

        expect(status).toEqual(200);
        expect(email).toEqual('amy@bk99.gov');
        expect(jwt).toBeTruthy();

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with a general error message when an unregistered email address is entered', async done => {
      const userInformation = {
        email: 'terry@bk99.gov',
        password: 'lacy_and_ava',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { message } = body;

        expect(status).toEqual(404);
        expect(message).toEqual('Could not find user or wrong password. Please try again.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with a general error message when an incorrect password is entered', async done => {
      const userInformation = {
        email: 'amy@bk99.gov',
        password: 'i_Love_Jake',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { message } = body;

        expect(status).toEqual(404);
        expect(message).toEqual('Could not find user or wrong password. Please try again.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });
};

export default userTests;
