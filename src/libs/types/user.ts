import { UserStatus, UserType } from "../enums/user.enum";

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