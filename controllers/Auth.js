import bcrypt from 'bcrypt';
import User from '../models/User.js'



export const register=async(req,res)=>{
      try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        // Create a new user
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });

        const user=await newUser.save();
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error)
      }
}

export const login=async(req,res)=>{
     try {
        const user=await User.findOne({email:req.body.email});
         !user && res.status(404).json({message:"User not found"});

         const validPassword=await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(404).json({message:"Wrong Password"})

        res.status(200).json(user);
     } catch (error) {
          res.status(500).json(error);
     }
}