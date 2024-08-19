import express from "express";
import {LoginUser, LogoutUser, signupUser }from "../../controller/userController.js"

const userRouter=express.Router();

userRouter.post('/signupUser',signupUser)
userRouter.post('/loginUser',LoginUser)
userRouter.get('/logoutUser',LogoutUser)




export default userRouter