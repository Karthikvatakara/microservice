import { UserEntity } from "../entities";

export interface ISignupUserUseCase {
    execute(data:UserEntity): Promise<UserEntity | null>;
}
