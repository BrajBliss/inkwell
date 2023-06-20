import express from 'express';
import { register, login, getUser, logout } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', getUser);
router.get('/logout', logout);

export default router;
