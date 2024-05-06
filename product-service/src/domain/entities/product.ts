import { ObjectId } from "mongoose";

export interface Product {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}