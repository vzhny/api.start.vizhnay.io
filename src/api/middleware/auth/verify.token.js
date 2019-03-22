import jwt from 'jsonwebtoken';
import handleError from '@/api/helpers/handleError';

/* eslint-disable consistent-return */

const verifyToken = (req, res, next) => {
  const { token } = req;
  // Adding an error flag to prevent the following error:
  // Uncaught Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  let didNotEncounterError = true;

  if (!token) {
    didNotEncounterError = false;

    const message = 'No authorization token was provided.';
    return handleError(res, 403, message);
  }

  // eslint-disable-next-line
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      didNotEncounterError = false;

      const message = 'Failed to authenticate the provided token.';
      return handleError(res, 500, message);
    }

    res.locals.userId = decoded.userId;
  });

  if (didNotEncounterError) {
    return next();
  }
};

export default verifyToken;
