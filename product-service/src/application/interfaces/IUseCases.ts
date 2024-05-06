import { IAddProductUseCase,IListProductUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependency";

export interface IuseCase {
    addProductUseCase:(dependencies:IDependencies) => IAddProductUseCase;
    listProductUseCase:(dependencies:IDependencies) => IListProductUseCase;
}