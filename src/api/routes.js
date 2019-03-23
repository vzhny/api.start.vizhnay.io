import express from 'express';
import { register, login } from '@/api/controllers/user.controllers';
import { getAllLinks, getOneLink, addNewLink, updateLink, deleteLink } from '@/api/controllers/link.controllers';
import verifyToken from '@/api/middleware/auth/verify.token';

const router = express.Router();

router.route('/auth/register').post(register);

router.route('/auth/login').post(login);

router.route('/links').get(verifyToken, getAllLinks);

router.route('/links').post(verifyToken, addNewLink);

router.route('/links/:linkId').get(verifyToken, getOneLink);

router.route('/links/:linkId').put(verifyToken, updateLink);

router.route('/links/:linkId').delete(verifyToken, deleteLink);

export default router;
