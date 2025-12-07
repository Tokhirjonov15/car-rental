import express, { Response, Request } from "express";
import { T } from "../libs/types/common";
import { AdminRequest, LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";
import UserService from "../models/User.service";
import { Message } from "../libs/Error";

const companyController: T = {};
const userService = new UserService();

companyController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (err) {
        console.log("ERROR, goHome:", err);
    }
};

companyController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
    }
};

companyController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.render("signup");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
    }
};

companyController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup:");
        const newUser: UserInput = req.body;
        newUser.userType = UserType.COMPANY;
        const result = await userService.processSignup(newUser);
        
        req.session.user = result;
        req.session.save(function() {
            res.send(result);
        }); 
    } catch (err) {
        console.log("ERROR, processSignup:", err);
        res.send(err);
    }
};

companyController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body:", req.body);
        const input: LoginInput = req.body;   
        const result = await userService.processLogin(input); 

        req.session.user = result;
        req.session.save(function() {
            res.send(result);
        });
    } catch (err) {
        console.log("ERROR, processLogin:", err);
        res.send(err);
    }
};

companyController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        console.log("checkAuthSession");
        if (req.session?.user)
            res.send(`<script> alert("${req.session.user.userId}")</script>`);
        else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script>`);
    } catch (err) {
        console.log("ERROR, checkAuthSession:", err);
        res.send(err);
    }
}

export default companyController;