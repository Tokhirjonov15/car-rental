import express, { Response, Request } from "express";
import { T } from "../libs/types/common";
import { LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";
import UserService from "../models/User.service";

const companyController: T = {};
companyController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.send("Home Page");
    } catch (err) {
        console.log("ERROR, goHome:", err);
    }
};

companyController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login Page");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
    }
};

companyController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.send("Signup Page");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
    }
};

companyController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup:");
        console.log("req.body:", req.body);
        const newUser: UserInput = req.body;
        newUser.userType = UserType.COMPANY;

        const userService = new UserService();
        const result = await userService.processSignup(newUser);

        res.send(result);
    } catch (err) {
        console.log("ERROR, processSignup:", err);
        res.send(err);
    }
};

companyController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body;
        const userService = new UserService;   
        const result = await userService.processLogin(input);                
        res.send(result);
    } catch (err) {
        console.log("ERROR, processLogin:", err);
        res.send(err);
    }
};

export default companyController;