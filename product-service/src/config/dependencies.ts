import * as repositories from '../infrastructure/database/mongoDB/repositories' 
import { IDependencies } from '../application/interfaces/IDependency'
import * as useCases from "../application/usecases"

export const dependencies: IDependencies = {
    repositories,
    useCases
}