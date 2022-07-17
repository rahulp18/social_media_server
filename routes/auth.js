import express from 'express';
import { login, register } from '../controllers/Auth.js';

const router=express.Router();

// Create User (REGISTER)

router.post('/register',register);
router.post('/login',login);


export default router;
