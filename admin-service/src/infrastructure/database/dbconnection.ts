import mongoose from "mongoose";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

export default async () => {
    try{
        const mongoUrl = process.env.MONGO_URL
        if(!mongoUrl){
            throw new Error("mongodb connection string is not provided")
        }

        mongoose.connect(mongoUrl.trim());
        console.log("mongodb connected succesfully");
        
    }catch(error:any){
        console.log("mongodb connection failed");
        console.log(error?.message);
        process.exit(1)
    }
} 