import express from 'express';
import { login, register, updateUser } from '../controllers/authController';
import authenticateUser from '../middleware/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
