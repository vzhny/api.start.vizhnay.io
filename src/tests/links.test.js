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
        expect(firstLink.title).toEqual('Google');
        expect(firstLink.owner).toEqual('2FIOCbin6');
        expect(firstLink.category).toEqual('Google');
        expect(secondLink.url).toEqual('https://netflix.com');
        expect(secondLink.title).toEqual('Netflix');
        expect(secondLink.owner).toEqual('2FIOCbin6');
        expect(secondLink.category).toEqual('Entertainment');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });

  describe('POST /api/links', () => {
    it('should successfully add a new link', async done => {
      try {
        const newLink = {
          url: 'https://adobe.com',
          title: 'Adobe',
          category: 'Design',
        };

        const { status, body } = await request(app)
          .post('/api/links')
          .send(newLink)
          .set('authorization', token);

        const { url, title, category, owner, id } = body;

        expect(status).toEqual(201);
        expect(url).toEqual('https://adobe.com');
        expect(title).toEqual('Adobe');
        expect(category).toEqual(4);
        expect(owner).toEqual('2FIOCbin6');
        expect(id).toEqual(5);

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error if there is no category field in the added link', async done => {
      try {
        const newLink = {
          url: 'https://gimp.com',
          title: 'GIMP',
        };

        const { status, body } = await request(app)
          .post('/api/links')
          .send(newLink)
          .set('authorization', token);

        const { message } = body;

        expect(status).toEqual(400);
        expect(message).toEqual('Please add a category associated with the link.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error if the required fields are missing', async done => {
      try {
        const newLink = {
          category: 'Shopping',
        };

        const { status, body } = await request(app)
          .post('/api/links')
          .send(newLink)
          .set('authorization', token);

        const { message, error } = body;
        const { title, url } = error.data;
        const [titleDetails] = title;
        const [urlDetails] = url;

        const expectedTitleDetails = {
          message: 'is a required property',
          keyword: 'required',
          params: {
            missingProperty: 'title',
          },
        };

        const expectedUrlDetails = {
          message: 'is a required property',
          keyword: 'required',
          params: {
            missingProperty: 'url',
          },
        };

        expect(status).toEqual(400);
        expect(message).toEqual('There was an error adding the link, please try again later.');
        expect(titleDetails).toEqual(expectedTitleDetails);
        expect(urlDetails).toEqual(expectedUrlDetails);

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });
};

export default linkTests;
