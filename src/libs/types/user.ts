import { Session } from "express-session";
import { UserStatus, UserType } from "../enums/user.enum";
import { Request } from 'express';

export interface User {
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

export interface AdminRequest extends Request {
    user: User;
    session: Session & { user: User };
}