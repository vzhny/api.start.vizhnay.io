import request from 'supertest';
import shortId from 'shortid';
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
        expect(firstLink.linkId).toEqual('8bgqqjUrG');
        expect(firstLink.url).toEqual('https://google.com');
        expect(firstLink.title).toEqual('Google');
        expect(firstLink.category).toEqual('Google');
        expect(secondLink.linkId).toEqual('iU9MAYeN3A');
        expect(secondLink.url).toEqual('https://netflix.com');
        expect(secondLink.title).toEqual('Netflix');
        expect(secondLink.category).toEqual('Entertainment');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error if an invalid authorization token is sent', async done => {
      try {
        const { status, body } = await request(app)
          .get('/api/links')
          .set('authorization', 'Bearer this_is_invalid');

        const { message } = body;

        expect(status).toEqual(401);
        expect(message).toEqual('Failed to authenticate the provided token.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error if no authorization token is sent', async done => {
      try {
        const { status, body } = await request(app).get('/api/links');

        const { message } = body;

        expect(status).toEqual(400);
        expect(message).toEqual('No authorization token was provided.');

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

        const { linkId, url, title, category } = body;

        expect(status).toEqual(201);
        expect(shortId.isValid(linkId)).toBeTruthy();
        expect(url).toEqual('https://adobe.com');
        expect(title).toEqual('Adobe');
        expect(category).toEqual('Design');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should successfully reflect the previous addition when retrieving all links', async done => {
      try {
        const { status, body } = await request(app)
          .get('/api/links')
          .set('authorization', token);

        const { links } = body;
        const [firstLink, secondLink, thirdLink] = links;

        expect(status).toEqual(200);
        expect(links).toHaveLength(3);
        expect(firstLink.url).toEqual('https://google.com');
        expect(firstLink.title).toEqual('Google');
        expect(firstLink.category).toEqual('Google');
        expect(secondLink.url).toEqual('https://netflix.com');
        expect(secondLink.title).toEqual('Netflix');
        expect(secondLink.category).toEqual('Entertainment');
        expect(thirdLink.url).toEqual('https://adobe.com');
        expect(thirdLink.title).toEqual('Adobe');
        expect(thirdLink.category).toEqual('Design');

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

    it('should return an error when attempting to add a duplicate link', async done => {
      try {
        const newLink = {
          url: 'https://google.com',
          title: 'Google',
          category: 'Google',
        };

        const { status, body } = await request(app)
          .post('/api/links')
          .send(newLink)
          .set('authorization', token);

        const { message } = body;

        expect(status).toEqual(400);
        expect(message).toEqual('Cannot add a duplicate link, please update the url and try again.');

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

        expect(status).toEqual(500);
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

  describe('GET /api/links/:linkId', () => {
    it('should successfully retrieve the specified link', async done => {
      const linkId = '8bgqqjUrG';

      try {
        const { status, body } = await request(app)
          .get(`/api/links/${linkId}`)
          .set('authorization', token);

        const { linkId: id, url, title, category } = body;

        expect(status).toEqual(200);
        expect(id).toEqual(linkId);
        expect(url).toEqual('https://google.com');
        expect(title).toEqual('Google');
        expect(category).toEqual('Google');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error when trying to retrieve a link not created by the user', async done => {
      const linkId = 'XIe7pPTF8P';

      try {
        const { status, body } = await request(app)
          .get(`/api/links/${linkId}`)
          .set('authorization', token);

        const { message } = body;

        expect(status).toEqual(401);
        expect(message).toEqual('Unauthorized access to specified link.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });

  describe('PUT /api/links/:linkId', () => {
    it('should successfully update the specified link', async done => {
      const linkId = '8bgqqjUrG';
      const updatedLink = {
        url: 'https://www.google.com/imghp?hl=en&tab=wi',
        title: 'Google Images',
        category: 'Search',
      };

      try {
        const { status } = await request(app)
          .put(`/api/links/${linkId}`)
          .send(updatedLink)
          .set('authorization', token);

        expect(status).toEqual(204);

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error if there is no category field in the updated link', async done => {
      try {
        const linkId = '8bgqqjUrG';
        const updatedLink = {
          url: 'https://www.google.com/imghp?hl=en&tab=wi',
          title: 'Google Images',
        };

        const { status, body } = await request(app)
          .put(`/api/links/${linkId}`)
          .send(updatedLink)
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

    it('should successfully reflect the previous update when retrieving the link', async done => {
      const linkId = '8bgqqjUrG';

      try {
        const { status, body } = await request(app)
          .get(`/api/links/${linkId}`)
          .set('authorization', token);

        const { linkId: id, url, title, category } = body;

        expect(status).toEqual(200);
        expect(id).toEqual(linkId);
        expect(url).toEqual('https://www.google.com/imghp?hl=en&tab=wi');
        expect(title).toEqual('Google Images');
        expect(category).toEqual('Search');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error when trying to update a link not created by the user', async done => {
      const linkId = 'XIe7pPTF8P';

      try {
        const { status, body } = await request(app)
          .get(`/api/links/${linkId}`)
          .set('authorization', token);

        const { message } = body;

        expect(status).toEqual(401);
        expect(message).toEqual('Unauthorized access to specified link.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });

  describe('DELETE /api/links/:linkId', () => {
    it('should successfully delete the specified link', async done => {
      const linkId = '8bgqqjUrG';

      try {
        const { status } = await request(app)
          .delete(`/api/links/${linkId}`)
          .set('authorization', token);

        expect(status).toEqual(204);

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should successfully reflect the previous deletion when retrieving all links', async done => {
      try {
        const { status, body } = await request(app)
          .get('/api/links')
          .set('authorization', token);

        const { links } = body;
        const [firstLink, secondLink] = links;

        expect(status).toEqual(200);
        expect(links).toHaveLength(2);
        expect(firstLink.url).toEqual('https://netflix.com');
        expect(firstLink.title).toEqual('Netflix');
        expect(firstLink.category).toEqual('Entertainment');
        expect(secondLink.url).toEqual('https://adobe.com');
        expect(secondLink.title).toEqual('Adobe');
        expect(secondLink.category).toEqual('Design');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should return an error when trying to delete a link not created by the user', async done => {
      const linkId = 'XIe7pPTF8P';

      try {
        const { status, body } = await request(app)
          .get(`/api/links/${linkId}`)
          .set('authorization', token);

        const { message } = body;

        expect(status).toEqual(401);
        expect(message).toEqual('Unauthorized access to specified link.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });
};

export default linkTests;
