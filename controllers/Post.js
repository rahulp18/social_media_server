import User from '../models/User.js';
import Post from '../models/Post.js';

export const createPost=async(req,res)=>{
    try {
        const newPost=new Post(req.body);
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updatePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json({message:"the post has been udated"})
        } else{
            res.status(403).json({message:"you can update only you post"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// Delete User

export const deletePost=async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).json({message:"post deleted"});
        } else{
            res.status(403).json({message:"you can delete only your post"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// Like post 

export const likePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json({message:"the post has been liked"})
        } else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json({message:"The post has been disliked"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get post

export const getPost=async(req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}
// get time line

export const timeLinePost=async(req,res)=>{
    try {
        const currentUser=await User.findById(req.body.userId);
        const userPosts=await Post.find({userId:currentUser._id});
       
        let friendPost=[];
         for(let friendId of currentUser.followings){
            const posts=await Post.find({userId:friendId});
             friendPost=posts;
         }
         let results=[...userPosts,...friendPost];

         res.status(200).json(results);
          
    } catch (error) {
        res.status(500).json(error);
    }
}