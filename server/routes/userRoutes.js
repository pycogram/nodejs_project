import express from 'express';
import { createUser, loginUser } from '../controllers/userControllers.js';

const router = express.Router();

// Middleware incharge of routing

// create a user routes
router.post('/', createUser);

// login a user routes
router.post('/login', loginUser);

export {router as userRoutes}

