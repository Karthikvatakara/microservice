import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { UserEntity } from "../../domain/entities";
import generateToken from "../../utils/jwt/generateToken";
import { dependencies } from "../../config/dependencies";

export const loginController = (dependencies: IDependencies) => {
    const { useCases: { loginUserUseCase } } = dependencies;
    return async (req:Request,res:Response,next:NextFunction): Promise<void> => {
        try{
            const userCredentials = req.body;
            const {email,password} = req.body;
            console.log("=========================  =============   ============= ===")
            if(!email || !password) {
                res.status(400).json({success: false,message:"email and password are required"});
                return;
            }

            const user:UserEntity | null = await loginUserUseCase(dependencies).execute(userCredentials)

            if(user){
                const userId: string = user._id?.toString() ?? "";
                const token = generateToken({
                    userId: userId,
                    userEmail:user.email,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked
                });

                res.cookie("auth",token,{maxAge:1000*60*60*24, httpOnly:true});
                res.status(200).json({success:true,data:user,message:"login succesfull"});
            } else {
                res.status(401).json({success:false,message:"invalid email or password"})
            }
        } catch(error){
            next(error)
        }
    }
}