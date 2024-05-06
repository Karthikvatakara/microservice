import { AddUserUseCase,loginAdminUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    loginAdminUseCase:(dependency:IDependencies) => loginAdminUseCase
    addUserUseCase:(dependency:IDependencies) => AddUserUseCase
}