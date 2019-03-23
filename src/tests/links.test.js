import request from 'supertest';
import app from '@/app';
import server from '@/server';

/* eslint-disable no-unused-expressions */

beforeEach(() => {
  server.close();
});

const linkTests = () => {
  let token = null;

  describe('POST /api/auth/login', () => {
    it('should successfully retrieve a jwt token to use for authentication', async done => {
      const userInformation = {
        email: 'jake@bk99.gov',
        password: 'i_luv_amy',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { email, jwt } = body;

        expect(status).toEqual(200);
        expect(email).toEqual('jake@bk99.gov');
        expect(jwt).toBeTruthy();

        token = jwt;

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });

  describe('GET /api/links', () => {
    it("should successfully retrieve the user's created links", async done => {
      try {
        const { status, body } = await request(app)
          .get('/api/links')
          .set('authorization', token);

        const { links } = body;
        const [firstLink, secondLink] = links;

        expect(status).toEqual(200);
        expect(links).toHaveLength(2);
        expect(firstLink.url).toEqual('https://google.com');
        expect(firstLink.name).toEqual('Google');
        expect(firstLink.owner).toEqual('2FIOCbin6');
        expect(firstLink.category).toEqual('Google');
        expect(secondLink.url).toEqual('https://netflix.com');
        expect(secondLink.name).toEqual('Netflix');
        expect(secondLink.owner).toEqual('2FIOCbin6');
        expect(secondLink.category).toEqual('Entertainment');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });
};

export default linkTests;
