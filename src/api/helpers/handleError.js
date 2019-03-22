const env = process.env.NODE_ENV;

export default (res, status, message, error = null) => {
  let response = {
    message,
  };

  if (error !== null) {
    response = {
      ...response,
      error: env !== 'production' ? error : {},
    };
  }

  return res.status(status).json(response);
};
