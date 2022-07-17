import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/post.js'
 
const app=express();
 
dotenv.config();

// Connect with mongo atlas server

 const connectServer=async(url)=>{
    try {
        await mongoose.connect(url);
        console.log('DataBase connected');
        StartServer();
    } catch (error) {
        console.log(error);
    }
     
 }



 
 
// Middlware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
const PORT =process.env.PORT || 5000;

const StartServer=()=>{
    
    app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`));
}

connectServer(process.env.MONGO_URI);


// Routes

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);

app.get('/',(req,res)=>{
    res.status(200).json({hello:"Welcome to rahul social media api"})
})