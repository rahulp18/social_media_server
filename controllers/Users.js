import User from '../models/User.js';
import bcrypt from 'bcrypt'

export const  userUpdate=async(req,res)=>{
     
 
         if(req.body.userId===req.params.id || req.body.isAdmin){
             if(req.body.password){
                try {
                    const salt=await  bcrypt.genSalt(10);
                    req.body.password=await bcrypt.hash(req.body.password,salt);
                } catch (error) {
                    return res.status(400).json(error);
                }
             }
             try {
                const user=await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                });
                res.status(200).json({message:"Data updated"});
             } catch (error) {
                res.status(500).json(error);
             }
         }
   
     
}

export const deleteUser=async(req,res)=>{
     if(req.body.userId===req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"Account has been deleted"});
        } catch (error) {
            return res.status(403).json(error);
        }
     } else{
        return res.status(403).json({message:"You can delete only your account"});
     }
}


export const getUser=async(req,res)=>{
      try {
           const user=await User.findById(req.params.id);
           
           const {password,updatedAt,...other}=user._doc;

           res.status(200).json(other);
      } catch (error) {
        res.status(500).json(error);
      }
}

export const followUser=async(req,res)=>{
    if(req.body.userId!==req.params.id){
      try {
        const user=await User.findById(req.params.id);

        const currentUser=await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentUser.updateOne({$push:{followings:req.params.id}});
            res.status(200).json({message:"user has been follow this user"});
        } else{
            res.status(403).json({message:"you already follow this user"});
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else{
        res.status(403).json({message:"you can't follow youself"})
    }
}

export const unfollowUser=async(req,res)=>{
     if(req.body.userId!==req.params.id){
        try {
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
   
            if(user.followers.includes(req.body.userId)){
               await user.updateOne({$pull:{followers:req.body.userId}});
               await currentUser.updateOne({$pull:{followings:req.params.id}})
               res.status(200).json({message:"user has been un followed"});
            } else{
                res.status(403).json({message:"You don't follow this user"});
            }
        } catch (error) {
            res.status(500).json(error);
        }
     } else{
        res.status(403).json({message:"you can't unfollow yourself"});
     }
}

// Get all users

export const getAllUsers=async(req,res)=>{

    try {
        const users=await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }

}