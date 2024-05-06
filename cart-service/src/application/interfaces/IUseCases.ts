import { IGetCartUseCase,IaddToCartUseCase } from "../../domain/useCaeInterface";

import { IDependencies } from "./IDependencies"

export interface IUseCases{
    addToCartUseCase:(dependencies:IDependencies)=>IaddToCartUseCase;
    getCart:(dependencies:IDependencies)=>IGetCartUseCase;
}