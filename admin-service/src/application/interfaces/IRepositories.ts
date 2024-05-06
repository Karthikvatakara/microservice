import { UserEntity,UserData,AdminEntity,AdminLoginRequest } from "../../domain/entities";

export interface IRepositories {
    login:(data:AdminLoginRequest) => Promise<AdminEntity | null>;
    addUser:(data:UserData) => Promise<UserEntity | null>;
}