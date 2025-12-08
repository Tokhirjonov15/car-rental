import express, { Response, Request, NextFunction } from "express";
import { T } from "../libs/types/common";
import { AdminRequest, LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";
import UserService from "../models/User.service";
import Errors, { Message } from "../libs/Error";

const companyController: T = {};
const userService = new UserService();

companyController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (err) {
        console.log("ERROR, goHome:", err);
        res.redirect("/admin");
    }
};

companyController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login");
    } catch (err) {
        console.log("ERROR, getLogin:", err);
        res.redirect("/admin");
    }
};

companyController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.render("signup");
    } catch (err) {
        console.log("ERROR, getSignup:", err);
        res.redirect("/admin");
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
        const message = 
          err instanceof Errors ? err.message : Message.SOMETHNG_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
        );
    }
};

companyController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        const input: LoginInput = req.body;   
        const result = await userService.processLogin(input); 

        req.session.user = result;
        req.session.save(function() {
            res.send(result);
        });
    } catch (err) {
        console.log("ERROR, processLogin:", err);
        const message = 
          err instanceof Errors ? err.message : Message.SOMETHNG_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/login') </script>`
        );
    }
};

companyController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(function () {
            res.redirect("/admin");
        })
    } catch (err) {
        console.log("ERROR, logout:", err);
        res.redirect("/admin");
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
};

companyController.verifyCompany = (
    req: AdminRequest, 
    res: Response,
    next: NextFunction
) => {
        if (req.session?.user?.userType === UserType.COMPANY) {
            req.user = req.session.user;
            next();
        } else {
            const message = Message.NOT_AUTHENTICATED;
            res.send (
                `<script> alert("${message}"); window.location.replace("/admin/login"); </script>`
            );
        }
};

export default companyController;