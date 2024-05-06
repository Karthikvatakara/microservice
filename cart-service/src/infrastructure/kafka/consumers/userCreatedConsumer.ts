import { Schema } from "mongoose";
import { insertUser } from "../../database/mongoDB/repositories";

export default async (data:{
    _id: Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string
})=>{
    try{
        console.log("reached inside the consumer");
        await insertUser(data)
    }catch(error:any){
        console.log(error?.message);
        
    }   
}