import { Product,ProductRequest } from "../../../../domain/entities";
import { product } from "../../../../infrastructure/database/mongoDB/models/productSchema";


export const addProduct = async (data: ProductRequest): Promise<Product | null> => {
    try{
        const newProduct = new product(data);

        const savedProduct = await newProduct.save();

        return savedProduct
    }catch(error) {
        console.error("error adding the product ",error);
        throw new Error("failed to add product")
    }
}