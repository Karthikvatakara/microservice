import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async() => {
    try{
        const mongoUrl = process.env.MONGO_URL
        if(!mongoUrl) {
            throw new Error('mongodb connection string is not provided')
        }

        await mongoose.connect(mongoUrl.trim());
        console.log("mongodb connected succesfully");
        
    }catch(error:any){
        console.error("database connection failed");
        console.error(error?.message);
        process.exit(1) 
        
    }
}