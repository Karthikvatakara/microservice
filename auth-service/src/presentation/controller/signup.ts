import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { hashPassword } from "../../utils/bcrypt/hashpassword";
import generateToken from "../../utils/jwt/generateToken";
import { dependencies } from "../../config/dependencies";
import { userCreatedProducer } from "../../infrastructure/kafka/producers/userCreatedProducer";

export const signupController = (dependencies:IDependencies) => {
    const {useCases: {SignupUserUseCase,findUserByEmailUseCase}} = dependencies;

    return async (req:Request,res:Response,next:NextFunction):Promise<void> => {
        try{
            const credentials = req.body;

            if(!credentials.username || !credentials.username.trim()) {
                res.status(400).json({success:false,message:"username must be required"});
                return;
            }
            if(!credentials.email || !credentials.password) {
                res.status(400).json({success:false,message:"email and password are required"})
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailRegex.test(credentials.email)) {
                res.status(400).json({success:false,message:"invalid email"});
                return;
            }
            if(credentials.password.length <4) {
                res.status(400).json({success:false,message:"password must contain 6 characters long"})
                return;
            }

            try{
                const existingUser = await findUserByEmailUseCase(dependencies).execute(credentials.email);
                if(existingUser){
                    res.status(400).json({success:false,message:"email already exist"})
                    return;
                }
            }catch(error:any){
                console.error("error finding email",error);
            }

            console.log("reached hashed portion==========================================");
            
            const hashedPassword:string | null = await hashPassword(credentials.password);
            console.log("seconde hashed log===================================");
            
            credentials.password = hashedPassword;
            const user = await SignupUserUseCase(dependencies).execute(req.body);
            if(user) {
                const userId: string = user._id?.toString() ?? "";
                const token = generateToken({
                    userId:userId,
                    userEmail:user.email,
                    isAdmin:user.isAdmin,
                    isBlocked:user.isBlocked,
                })

                res.cookie("auth",token,{maxAge:1000*60*60*24,httpOnly:true});
                res.status(201).json({success:true,data:user,message:"user created"})
                const addedUser = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    isBlocked: user.isBlocked,
                    role:user.role,
                    isAdmin: user.isAdmin
                }
                if(addedUser){
                    userCreatedProducer(addedUser)
                }else{
                    res.status(404).json({success:false,message:"user not found"})
                }
            }
        }catch(error) {
            next(error)
        }
    }
}