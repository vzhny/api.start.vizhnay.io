import express from 'express';
import { register, login } from '@/api/controllers/user.controllers';
import verifyToken from '@/api/middleware/auth/verify.token';

const router = express.Router();

// POST register route
router.route('/auth/register').post(register);

// POST login route
router.route('/auth/login').post(login);

// POST example authenticated route
router.route('/authenticated').post(verifyToken, (req, res) => {
  return res.status(200).json({
    message: 'Authenticated the user successfully!',
  });
});

export default router;
