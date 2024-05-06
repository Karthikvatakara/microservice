import { UserData,UserEntity } from "../entities";

export interface AddUserUseCase {
    execute(credentials:UserData):Promise<UserEntity | null>
}