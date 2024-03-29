import express from 'express';
import { getCurrentUser, login, logout, register, updateUser } from '../controllers/authController';
import authenticateUser from '../middleware/auth';
import rateLimit from 'express-rate-limit';

const apiLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP address, please try again after 15 minutes.',
});

const router = express.Router();

router.route('/register').post(apiLimit, register);
router.route('/login').post(apiLimit, login);
router.get('/logout', logout);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
