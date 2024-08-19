

import userModel from "../Models/userModel.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

//Register new User=>/api/v1/user/signupUser
export const signupUser=asyncHandler(async(req,res,next)=>{

    const{name,email,password}=req.body;

      const newUser=await userModel.create({name,email,password})


      sendToken(newUser,201,"registered",res)
})

//Login User=>/api/v1/user/loginUser
export const LoginUser=asyncHandler(async(req,res,next)=>{

    const{email,password}=req.body;

    if(!email || !password){
       
        return next(new errorHandler("email and password are required",400));

    }

    const user=await userModel.findOne({email}).select("+password");

    if(!user){
        return next(new errorHandler("invalid user or passwird",401));
    }

    //check if the password is correct
     
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new errorHandler("invalid user or passwird",401));
    }

    sendToken(user,200,"loggedin",res)

    //   const token=use

    //   res.status(200).json({message:"successfully loggedin",token})
})

//LogOut User=>/api/v1/user/logoutUser
export const LogoutUser=asyncHandler(async(req,res,next)=>{
   //set the cookie null
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({message:"loggedOut",})

})



