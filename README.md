# api.start.vizhnay.io

![Travis (.org)](https://img.shields.io/travis/vzhny/api.start.vizhnay.io.svg?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/vzhny/api.start.vizhnay.io.svg?style=for-the-badge)

> A restful API used for saving users' start page links.

## Documentation

The link routes are only accessible to users that are currently logged in.

**/api/links**

- GET - Retrieves all links created by the user
  - On success, returns an array of links

```json
{
  "links": [
    {
      "url": "https://google.com",
      "title": "Google",
      "category": "Google",
      "linkId": "8bgqqjUrG"
    },
    {
      "url": "https://netflix.com",
      "title": "Netflix",
      "category": "Entertainment",
      "linkId": "iU9MAYeN3A"
    }
  ]
}
```

- POST - Creates one link
  - On success, returns the added link

```json
{
  "linkId": "zxJvCVjQ-",
  "url": "https://gimp.com",
  "title": "GIMP",
  "category": "Design"
}
```

**/api/links/:linkId**

- GET - Retrieves the specific link with the provided ID
  - On success, returns the specified link

```json
{
  "linkId": "8bgqqjUrG",
  "url": "https://google.com",
  "title": "Google",
  "category": "Google"
}
```

- PUT - Updates the specific with the provided ID parameterlink
  - On success, no returned JSON, as per REST specs
- DELETE - Deletes the specific with the provided ID parameterlink
  - On success, no returned JSON, as per REST specs

**/api/auth/register**

- POST - Registers a new user
  - On success, returns the user's email and an auth token

```json
{
  "email": "users-email",
  "jwt": "Bearer token"
}
```

**/api/auth/login**

- POST - Logs in an existing user
  - On success, returns the user's email and an auth tokent

```json
{
  "email": "users-email",
  "jwt": "Bearer token"
}
```

## Built with/using:

- [Node.js](https://nodejs.org/)
- [Babel](https://babeljs.io/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Objection](https://vincit.github.io/objection.js/)
- [Jest](https://jestjs.io/)
