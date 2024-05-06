import { IRepositories } from "./IRepositories";
import { IuseCase } from "./IUseCases";

export interface IDependencies {
    repositories:IRepositories,
    useCases:IuseCase
}