import express from 'express'
import { createPost, deletePost, getPost, likePost, timeLinePost, updatePost } from '../controllers/Post.js';

const router=express.Router();
// Create post
router.post('/',createPost);

// Update post
router.put('/:id',updatePost);

// delete post
router.delete('/:id',deletePost);

// like and deslike post

router.put('/:id/like',likePost);

// get a post
router.get('/:id',getPost);

// get Timeline
router.get("/timeline/all",timeLinePost);



export default router;