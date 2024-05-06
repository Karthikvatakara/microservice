import { UserEntity,UserData } from "../../../../domain/entities";
import { Admin } from "../models/loginSchema";
import bcrpypt from "bcrypt";
import { ObjectId } from "mongoose";

export const addUser = async(data:UserData): Promise<UserEntity | null> => {
    try{
        console.log(data);
        if(!data.email || !data.password) {
            throw new Error("username and password are required")
        }

        if(data.username.trim() === "") {
            throw new Error("username cannot be empty")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(data.email)) {
            throw new Error("invalid email format")
        }

        if(data.password.length < 6) {
            throw new Error("password must be 6 characters long")
        }

        const existingUser: UserEntity | null = await Admin.findOne({email:data.email})
        
        if(existingUser){
            throw new Error("email already exists")
        }

        const hashedPassword = await bcrpypt.hash(data.password,10);

        const newUser = new Admin ({
            username:data.username,
            email: data.email,
            password:hashedPassword,
            
        })
        
        const savedUser = await newUser.save();

        return savedUser as UserEntity

    }catch(error:any){
        throw new Error(error?.message);
    }
}