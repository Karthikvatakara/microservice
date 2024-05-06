import {IUseCases} from './IUseCases'
import { IRepositories } from './IRepositories'


export interface IDependencies {
    useCases: IUseCases;
    repositories:IRepositories;
}

