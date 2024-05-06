import { ObjectId } from "mongoose";

export interface ProductRequest {
    _id:string | ObjectId ;
    name:string;
    description:string;
    price:number;
    stock:number;
}