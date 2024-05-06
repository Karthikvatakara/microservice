import { User } from "../models/loginCredential";
import { UserEntity } from "../../../../domain/entities";
import { UserLoginEntity } from "../../../../domain/entities";
import bcrypt from "bcrypt"

export const login = async(data:UserLoginEntity): Promise<UserEntity | null> => {
    try{
        console.log(data);
        const user:UserEntity | null = await User.findOne({email:data.email})
        if(user) {
            const isMatch : boolean = await bcrypt.compare(data.password,user.password)
            if(!isMatch){
                throw new Error("username or password is incorrect")
            }else{
                return user as UserEntity;
            }
        }else{
            throw new Error("user not found")
        }
    }catch(error:any){
        throw new Error(error?.message)
    }
}