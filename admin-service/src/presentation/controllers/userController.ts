import { Response,Request,NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { UserData, UserEntity } from "../../domain/entities";

export const addUserController = (dependencies:IDependencies) => {
    const {useCases:{addUserUseCase}} = dependencies;

    if(!addUserUseCase) {
        throw new Error("adduserusecase is not defined in dependencies")
    }

    return async(req:Request,res:Response,next:NextFunction) => {
        try{
            const userData:UserData = req.body;
            console.log("the userdata received is ",userData);
            
            const addedUser: UserEntity | null = await addUserUseCase(dependencies).execute(userData)
            console.log(addedUser);
            
            res.status(201).json(addedUser);
        }catch(error){
            next(error)
        }
    }
}