import { Session } from "express-session";
import { UserStatus, UserType } from "../enums/user.enum";
import { Request } from 'express';
import { ObjectId } from "mongoose";

export interface User {
    _id: ObjectId;
    userType: UserType;
    userStatus: UserStatus;
    userId: string;
    userAge: number;
    userPhone: string;
    userPassword?: string;
    userAddress?: string;
    userImage?: string;
    userRating: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserInput {
    userType?: UserType;
    userStatus?: UserStatus;
    userId: string;
    userAge: number;
    userPhone: string;
    userPassword: string;
    userAddress?: string;
    userImage?: string;
    userRating?: number;
}

export interface LoginInput {
    userId: string;
    userPassword: string;
}

export interface UserUpdateInput {
    _id: ObjectId;
    userStatus?: UserStatus;
    userId?: string;
    userAge?: number;
    userPhone?: string;
    userPassword?: string;
    userAddress?: string;
    userImage?: string;
}

export interface ExtendsRequest extends Request {
    user: User;
    file: Express.Multer.File;
    files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
    user: User;
    session: Session & { user: User };
}