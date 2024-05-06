import { hash,genSalt } from "bcrypt";

export const hashPassword = async (password: string) => {
    try {
        const salt = await genSalt(10)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",typeof(password),salt);
        
        const hashedPassword = await hash(password,salt);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        
        if(!hashedPassword) {
            throw new Error("password hashing error")
        }
        return hashedPassword;
    } catch(error:any) {
        throw new Error(error.message);
    }
}