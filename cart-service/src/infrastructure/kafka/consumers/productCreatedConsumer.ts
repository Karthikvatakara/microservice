import { Types } from "mongoose";
import { insertProduct } from "../../database/mongoDB/repositories/addProduct";

export default async (data:{
    _id:string ,
    name?: string,
    description: string;
    price: number;
    stock:number;

}) => {
    console.log("🚀 ~ data:", data)
    try{
        console.log("product reached in the product conbosumer",data)
        await insertProduct(data as any)
        
    }catch(error:any){
        throw new Error(error?.message)
    }
}