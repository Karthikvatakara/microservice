import { Response,Request,NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependency";
import { Product } from "../../domain/entities";
import { validateProductRequest } from "../../utils/productValidation";
import { productCreatedProducer } from "../../infrastructure/kafka/producers/productCreatedProducer";
import mongoose from "mongoose";

export const addProductController = (dependencies:IDependencies) => {
    const {useCases:{addProductUseCase}} = dependencies;

    return async(req:Request,res:Response,next:NextFunction) =>{
        try{
            const data = req.body;
            const validationResult = validateProductRequest(data)

            if(!validationResult.isValid){
                return res.status(400).json({success:false,errors:validationResult.errors})
            }
            const product:Product | null = await addProductUseCase(dependencies).execute(data);
            res.status(201).json({success:true,data:product})

            if(product){
                const addedProduct = {
                    _id: String(product._id),
                    name:product.name,
                    description:product.description,
                    price:product.price,
                    stock:product.stock
                };
                console.log("🚀 ~ returnasync ~ addedProduct:", addedProduct)

                 productCreatedProducer(addedProduct);
                res.status(201).json({success:true, data:product});
            }else{
                res.status(404).json({success:true,message:"product not found"})
            }
        }catch(error:any) {

        }
    }
}