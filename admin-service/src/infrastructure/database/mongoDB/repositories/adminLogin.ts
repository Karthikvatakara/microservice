import { AdminEntity,AdminLoginRequest } from "../../../../domain/entities";
import { Admin } from "../models/loginSchema";
import bcrypt from "bcrypt";

export const login = async( data:AdminLoginRequest ): Promise<AdminEntity | null> => {

    try{
        console.log(data,"it is the data recieved for admin login");
        if(!data.email || !data.password){
            throw new Error("email and password required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(data.email)) {
            throw new Error("invalid email format");
        }

        if(data.password.length <8) {
            throw new Error("password must be 8 characters long");
        }

        const admin:AdminEntity | null = await Admin.findOne({email:data.email})
        console.log("admin found ",admin);
        
        if(admin) {
            const passwordMatch: boolean = await bcrypt.compare(data.password,admin.password);

            if(!passwordMatch) {
                throw new Error("incorrect email or password");
            }else {
                return admin as AdminEntity
            }
        } else{
            throw new Error("admin not found")
        }
    }catch(error:any){
        throw new Error(error?.message)
    }
}