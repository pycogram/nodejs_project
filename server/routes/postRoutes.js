import express from 'express';
import { createPost, deletePost, getAllPost, getPostByUser, updatePost } from '../controllers/postControllers.js';
import auth from '../middlewares/auths.js';

const router = express.Router();

// Middleware incharge of routing

// get all post rout
router.get('/', getAllPost);

// get all postByUser rout
router.get('/user', auth, getPostByUser);

// create post route
router.post('/form', auth, createPost);

// delete post route with post id
router.delete('/:id', auth, deletePost);

// update post route with post id
router.put('/:id', auth, updatePost);

export {router as postRoutes};