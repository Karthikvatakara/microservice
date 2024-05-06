import { Response,Request,NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependency";
import { Product } from "../../domain/entities";
import { dependencies } from "../../config/dependencies";

export const listProductsController = (dependencies:IDependencies) => {

    return async(req:Request,res:Response,next:NextFunction) => {
        const {useCases:{listProductUseCase}} = dependencies;

        try{
            const token:string | any = req.cookies.user_jwt;
            console.log("user accessed token of user is ",token);
            
            if(!token){
                throw new Error("no products ")
            }
            const products:Product[] | null = await listProductUseCase(dependencies).execute(token);

            if(!products){
                throw new Error("no products found");
            }
            res.status(200).json({success:true,data:products})
        }catch(error:any){
            next(error);
        }
    }
}