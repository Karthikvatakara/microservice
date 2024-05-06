import { Product,ProductRequest } from "../../../../domain/entities";
import { product } from "../../../../infrastructure/database/mongoDB/models/productSchema";
import { verifyToken } from "../../../../utils/verifyToken";

export const listProduct = async(token: string):Promise<Product[] | null> => {
   try{
    const decodedToken: any = await verifyToken(token)

    console.log("the decode token is ",decodedToken);
    
    const Role: string | undefined  = decodedToken?.role;

    if(!Role || Role === "user"){
        throw new Error("role not found for this token or unauthorized access")
    }

    const products:Product[] = await product.find();

    return products;
   }catch(error:any){
    console.error("failed to list products",error)
    throw new Error("failed to list products")
   }
}