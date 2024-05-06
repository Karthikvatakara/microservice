import {Request,Response,NextFunction} from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import jwt from "jsonwebtoken"
import { AdminEntity } from "../../domain/entities";


export const loginController = (dependencies:IDependencies) => {
    const {useCases:{loginAdminUseCase}} = dependencies
    
    const loginAdmin = async(req:Request,res:Response,next:NextFunction) => {
        try{
            const adminCredentails = req.body
            console.log(adminCredentails);
            
            const admin:AdminEntity | null = await loginAdminUseCase(dependencies).execute(adminCredentails)
            if(admin) {
                if(admin.role === "admin") {
                    let payload = {
                        _id: String(admin?._id),
                        email:admin?.email,
                        role: admin?.role,
                    };

                    const accessToken = jwt.sign(payload,String(process.env.ACCESS_TOKEN_SECRET),{ expiresIn:"1h"})

                    res.cookie("user_jwt",accessToken,{httpOnly:true});

                    res.status(200).json({success:true,user:admin,message:"admin verified"})
                }else{
                    res.status(401).json({error:"unauthorized role privilages"})
                }
            }else{
                res.status(401).json({error:"unauthorized access"})
            }
        }catch(error){
            next(error)
        }
    }
    return loginAdmin
}