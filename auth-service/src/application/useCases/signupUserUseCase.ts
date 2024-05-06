import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const SignupUserUseCase = (dependencies:IDependencies) => {
    const {repositories:{signup}} = dependencies;

    return {
        execute:async(data:UserEntity) => {
            try{
                return await signup(data) as UserEntity
            }catch(error){
                throw new Error(( error as Error)?.message)
            }
        }
    }
}