import express, { Response, Request, NextFunction } from "express";
import { T } from "../libs/types/common";
import UserService from "../models/User.service";
import { ExtendsRequest, LoginInput, User, UserInput } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Error";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const userService = new UserService;
const authService = new AuthService;
const userController: T = {};

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

userController.verifyAuth = async (
    req: ExtendsRequest, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = req.cookies["accessToken"];
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

export default userController;