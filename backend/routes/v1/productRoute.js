import express from "express";
import { createProductByAdmin, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../controller/productController.js";
import { authoriseRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
const productRouter=express.Router();

//admin
productRouter.post('/admin/addProduct',isAuthenticatedUser,authoriseRoles('admin','seller') ,createProductByAdmin)
productRouter.put('/admin/updateProduct/:id',isAuthenticatedUser,authoriseRoles('admin','seller') ,updateProduct)
productRouter.delete('/admin/deleteProduct/:id',isAuthenticatedUser,authoriseRoles('admin','seller') ,deleteProduct)
productRouter.get('/getAllProducts',isAuthenticatedUser,authoriseRoles('admin','seller') ,getAllProducts)
productRouter.get('/getProductById/:id',getProductById)





export default productRouter;