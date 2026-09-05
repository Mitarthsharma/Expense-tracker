const userModel=require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const createUser=async (req,res)=>{
const {username,email,password}=req.body;
const isExists=await userModel.findOne({email});
if(isExists){
    return res.status(409).json({
        message:"user already exists"
    })
}
const hashedpassword=await bcrypt.hash(password,10);
const user=await userModel.create({
    username,
    email,
    password:hashedpassword
})

res.status(201).json({
    message:"user created successfully",
    user
})
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
        return res.status(401).json({
            message:"User does not exists"
        })
    }
    const isPassword=await bcrypt.compare(password,user.password);
    if(!isPassword){
        
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
    res.cookie("token",token,{
        httpOnly:true
    })
    res.status(200).json({
        message:"User logged in succesfully",
       username:user.username
    })
}
module.exports={createUser,userLogin};