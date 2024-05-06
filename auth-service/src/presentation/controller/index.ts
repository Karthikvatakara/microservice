import { IDependencies } from "../../application/interfaces/IDependencies";
// import { dependencies } from "../../config/dependencies";
import { loginController } from "./login";
import { signupController} from "./signup";


export const controllers = (dependencies:IDependencies) => {
    return {
        signup:signupController(dependencies),
        login:loginController(dependencies)
    }
}