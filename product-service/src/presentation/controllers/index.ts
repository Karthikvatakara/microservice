import { IDependencies } from "../../application/interfaces/IDependency";
import { dependencies } from "../../config/dependencies";
import { addProductController } from "./addProduct";
import { listProductsController } from "./listProduct";

export const controllers = (dependencies:IDependencies) => {
    return {
        addProduct:addProductController(dependencies),
        listProduct:listProductsController(dependencies)
    }
}