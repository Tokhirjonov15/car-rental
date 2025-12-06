import express, { Response, Request } from "express";
import { T } from "../libs/types/common";
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

companyController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        res.send("DONE");
    } catch (err) {
        console.log("ERROR, processLogin:", err);
    }
};

companyController.processSignup = (req: Request, res: Response) => {
    try {
        console.log("processSignup");
        res.send("DONE");
    } catch (err) {
        console.log("ERROR, processSignup:", err);
    }
};

export default companyController;