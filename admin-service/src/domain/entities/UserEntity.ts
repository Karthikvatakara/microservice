import { ObjectId } from "mongoose";
import { Types } from "mongoose";

enum Role {
    user = "user",
    admin = "admin"
}

export interface UserEntity {
    _id?: Types.ObjectId | string ;
    username?: string ;
    email?: string;
    password?: string;
    role?: Role;
    isBlocked?: boolean;
    createdAt?:Date;
    updatedAt?:Date;
}