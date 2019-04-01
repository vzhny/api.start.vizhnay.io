# api.start.vizhnay.io

![Travis (.org)](https://img.shields.io/travis/vzhny/api.start.vizhnay.io.svg?style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/vzhny/api.start.vizhnay.io.svg?style=for-the-badge)
![David](https://img.shields.io/david/vzhny/api.start.vizhnay.io.svg?color=%232B7D0C&style=for-the-badge)
![David](https://img.shields.io/david/dev/vzhny/api.start.vizhnay.io.svg?color=%232B7D0C&style=for-the-badge)
![Codacy grade](https://img.shields.io/codacy/grade/e2807a15c82d430dbca7ad84f17e36da.svg?color=%232B7D0C&style=for-the-badge)

> A restful API used for saving users' start page links.

## Documentation

The link routes are only accessible to users that are currently logged in.

**/api/links**

GET - Retrieves all links created by the user, sorted by their categories. On success, returns an array of links.

```json
{
  "links": [
    {
      "category": "Google",
      "links": [
        {
          "title": "Google",
          "url": "https://google.com",
          "linkId": "8bgqqjUrG"
        }
      ]
    },
    {
      "category": "Entertainment",
      "links": [
        {
          "title": "Netflix",
          "url": "https://netflix.com",
          "linkId": "iU9MAYeN3A"
        }
      ]
    }
  ]
}
```

POST - Creates one link using the following payload format:

```json
{
  "title": "link-title",
  "url": "link-url",
  "category": "link-category"
}
```

On success, returns the added link.

```json
{
  "linkId": "zxJvCVjQ-",
  "url": "https://gimp.com",
  "title": "GIMP",
  "category": "Design"
}
```

**/api/links/:linkId**

GET - Retrieves the specific link with the provided ID. On success, returns the specified link.

```json
{
  "linkId": "8bgqqjUrG",
  "url": "https://google.com",
  "title": "Google",
  "category": "Google"
}
```

PUT - Updates the specific with the provided ID parameterlink. On success, no returned JSON, as per REST specs.

DELETE - Deletes the specific with the provided ID parameterlink. On success, no returned JSON, as per REST specs.

**/api/auth/register**

POST - Registers a new user using the following payload format:

```json
{
  "email": "users-email",
  "password": "users-password"
}
```

On success, returns the user's email and an auth token.

```json
{
  "email": "users-email",
  "jwt": "Bearer token"
}
```

**/api/auth/login**

POST - Logs in an existing user using the following payload format:

```json
{
  "email": "users-email",
  "password": "users-password"
}
```

On success, returns the user's email and an auth tokent

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
