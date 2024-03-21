import express from "express"
import bcrypt from "bcrypt"
import User from "../model/UserModel.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary"

const signupUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await User.findOne({$or: [{email},{password}]});
        if(user){
            return res.status(400).json("User already exists");
        }
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser= await User.create({
            name,
            email,
            password:hashedPassword
        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            res.status(200).json({
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            })
        }
        else{
            res.json("invalid credentials");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log({"error int signup user":error});
    }
}

const loginUser=async(req,res)=>{
    try {
        const {name,password}=req.body;
        const user=await User.findOne({name})
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || " ")
        if(!isPasswordCorrect || !user){
            return res.status(400).json({"error":"invalid username or password"})
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log({"error in the login user":error})
    }
}
const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({message:"User logged out Successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(`error in the logout :${error.message}` );
    }
}
const updateUser=async(req,res)=>{
    const userId=req.user._id;
    console.log(userId);
    const {name,email,password,phoneNumber}=req.body;
    let {profilePic}=req.body;
   try {
     let user=await User.findOne(userId)
     if(!user){
        return res.status(404).json({message:"user Not Found"})
     }
    //  console.log(req.params.id);
    //  if (req.params.id !== userId.toString()){
	// 		return res.status(400).json({ error: "You cannot update other user's profile" });
    //  }
    //  console.log(profilePic);
     if (profilePic) {
        if (user.profilePic) {
            await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
    }    
     user.name=name || user.name
     user.email=email || user.email
     if(password){
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        user.password=hashedPassword
     }
     user.profilePic=profilePic
     user.phoneNumber=phoneNumber || user.phoneNumber
     user =await user.save()
     user.password=null
     res.status(200).json(user);
   } catch (error) {
    console.log(`error in the update user ${error.message}`);
    res.status(500).json({error:error.message})
   }
}
const getUser=async(req,res)=>{
    try {
        let user;
        const {query}=req.params;
        if(mongoose.Types.ObjectId.isValid(query)){
            user=await User.findOne({_id:query}).select("-password")
        }
        else{
            user=await User.findOne({name:query}).select("-password")
        }
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(`error in the getUser ${error.message}`);
        res.status(500).json({error:error.message});
    }
}
export {signupUser,loginUser,logout,updateUser,getUser};