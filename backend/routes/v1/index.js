import express from "express";
import userRouter from "./userRoute.js";
import productRouter from "./productRoute.js";

const v1router=express.Router();

v1router.use('/user',userRouter)
v1router.use('/product',productRouter)




export default v1router;