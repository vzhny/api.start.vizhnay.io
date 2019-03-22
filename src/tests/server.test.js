import request from 'supertest';
import app from '@/app';
import server from '@/server';
import { repository } from '_root/package.json';

/* eslint-disable consistent-return */

beforeEach(() => {
  server.close();
});

const serverTests = () => {
  describe('GET /', () => {
    it('should send the correct message to check the documentation', async done => {
      try {
        const { status, text } = await request(app).get('/');

        expect(status).toEqual(200);
        expect(text).toEqual(`Please go to ${repository} for API usage information.`);

        done();
      } catch (error) {
        const { message } = error;
        done(message);
      }
    });
  });
};

export default serverTests;
