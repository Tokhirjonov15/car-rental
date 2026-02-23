import express, { Response, Request, NextFunction } from "express";
import { T } from "../libs/types/common";
import UserService from "../models/User.service";
import { ExtendsRequest, LoginInput, User, UserInput, UserUpdateInput } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Error";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const userService = new UserService;
const authService = new AuthService;
const userController: T = {};

const extractToken = (req: ExtendsRequest): string | undefined => {
    const cookieToken = req.cookies?.["accessToken"];
    if (cookieToken) return cookieToken;

    const authHeader = req.headers?.authorization;
    if (typeof authHeader === "string" && authHeader.trim() !== "") {
        if (authHeader.startsWith("Bearer ")) return authHeader.slice(7).trim();
        return authHeader.trim();
    }

    const xAccessToken = req.headers?.["x-access-token"];
    if (typeof xAccessToken === "string" && xAccessToken.trim() !== "") {
        return xAccessToken.trim();
    }

    const xAuthToken = req.headers?.["x-auth-token"];
    if (typeof xAuthToken === "string" && xAuthToken.trim() !== "") {
        return xAuthToken.trim();
    }

    return undefined;
};

userController.getCompany = async (req: Request, res: Response) => {
    try {
        console.log("getCompany");
        const result = await userService.getCompany();

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("ERROR, getCompany:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

userController.signup = async (req: Request, res: Response) => {
    try {
        console.log("signup");
        const input: UserInput = req.body,
          result: User = await userService.signup(input),
          token = await authService.createToken(result);
        
        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });
        
        res.status(HttpCode.CREATED).json({user: result, accessToken: token});
    } catch (err) {
        console.log("ERROR, signup:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

userController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body,
          result = await userService.login(input),
          token = await authService.createToken(result);

        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });
        
        res.status(HttpCode.CREATED).json({user: result, accessToken: token});
    } catch (err) {
        console.log("ERROR, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};

userController.logout = (req: ExtendsRequest, res: Response) => {
    try {
        console.log("logout");
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
        res.status(HttpCode.OK).json({ logout: true });
    } catch (err) {
        console.log("ERROR, logout:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart); 
    }
};

userController.getUserDetail = async (
    req: ExtendsRequest, 
    res: Response
) => {
    try {
        console.log("getUserDetail");
        const result = await userService.getUserDetail(req.user);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("ERROR, getUserDetail:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart); 
    }
};

userController.updateUser = async (req: ExtendsRequest, res: Response) => {
    try {
        console.log("updateUser");
        const input: UserUpdateInput = req.body;
        if (req.file) input.userImage = req.file.path.replace(/\\/, "/");
        const result = await userService.updateUser(req.user, input);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("ERROR, updateUser:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart); 
    }
}

userController.verifyAuth = async (
    req: ExtendsRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = extractToken(req);
        if (token) req.user = await authService.checkAuth(token);
        if (!req.user)
            throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
        
        next();
    } catch (err) {
        console.log("ERROR, verifyAuth:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

userController.retriveAuth = async (
    req: ExtendsRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = extractToken(req);
        if (token) req.user = await authService.checkAuth(token);

        next();
    } catch (err) {
        console.log("ERROR, retriveAuth");
        next();
    }
}

export default userController;
