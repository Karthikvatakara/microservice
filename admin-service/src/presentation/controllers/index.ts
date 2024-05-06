import { IDependencies } from "../../application/interfaces/IDependencies";
// import { login } from "../../infrastructure/database/mongoDB/repositories";
import { loginController } from "./login";
import {addUserController} from "./userController";

export const controllers = (dependencies:IDependencies) => {
    return {
        login:loginController(dependencies),
        addUser:addUserController(dependencies)
    }
}