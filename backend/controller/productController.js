import productModel from "../Models/productModel.js";
import errorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//get all products >>>> http://localhost:4444/api/v1/product/getAllProducts
export const getAllProducts=async(req,res)=>{

    const products=await productModel.find();
   console.log("user:",req.user);
   
    res.status(200).json({products,})
}


//Admin creates new products  http://localhost:4444/api/v1/product/admin/addProduct
export const createProductByAdmin=asyncHandler(async(req,res)=>{

    req.body.user=req.user._id  //assign the 'user' of productModel  to the id of current user who initiate the request

    const newProduct=await productModel.create(req.body);


    res.status(200).json({message:'new product has been created',newProduct,})
})

// get single product ... http://localhost:4444/api/v1/product/getProductById/:id

export const getProductById=asyncHandler(async(req,res,next)=>{

    const product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})
        return next(new errorHandler("product not found",400))
       
    }

    res.status(200).json({product,})
})

// update theproduct ... http://localhost:4444/api/v1/product/admin/updateProduct/:id

export const updateProduct=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})

        return next(new errorHandler("product not found",400))
       
    }

    product= await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})


    res.status(200).json({message:"product updated",product,})
})

// update theproduct ... http://localhost:4444/api/v1/product/admin/updateProduct/:id

export const deleteProduct=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})
        return next(new errorHandler("product not found",400))
       
    }

    await product.deleteOne();


    res.status(200).json({message:'the product is deleted successfully'})
})