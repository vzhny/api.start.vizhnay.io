import to from 'await-to-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import shortId from 'shortid';
import User from '@/models/user.model';
import handleError from '@/api/helpers/handleError';

/* eslint-disable consistent-return */

// POST register route controller
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (password.length <= 6) {
    return handleError(res, 400, 'Please enter a password with a length of 6 or more characters.');
  }

  const [userError, user] = await to(
    User.query().insert({
      userId: shortId.generate(),
      email,
      password: bcrypt.hashSync(password, 10),
    })
  );

  if (userError) {
    return handleError(res, 500, 'There was an error registering, please try again later.', userError);
  }

  const { userId } = user;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return res.status(201).json({
    email,
    jwt: `Bearer ${token}`,
  });
};

// POST login route controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  const [userError, user] = await to(
    User.query()
      .select()
      .where('email', email)
      .first()
  );

  if (userError) {
    return handleError(res, 404, 'Could not find user or wrong password. Please try again.', userError);
  }

  if (!user) {
    return handleError(res, 404, 'Could not find user or wrong password. Please try again.');
  }

  const { userId } = user;

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      email,
      jwt: `Bearer ${token}`,
    });
  }

  return handleError(res, 404, 'Could not find user or wrong password. Please try again.');
};
