import express from 'express'
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, userUpdate } from '../controllers/Users.js';


const router=express.Router();

// UPDATE USER

router.put("/:id",userUpdate);

// DELETE USER

router.delete('/:id',deleteUser);

// GET A USER 

router.get('/:id',getUser);
// Follow a user
router.put('/:id/follow',followUser);

// unfollow user

router.put('/:id/unfollow',unfollowUser);

// GET ALL USER

router.get('/',getAllUsers);


export default router;