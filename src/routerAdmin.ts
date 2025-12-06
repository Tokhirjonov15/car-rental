import express, { Response, Request } from "express";
const routerAdmin = express.Router();
import companyController from "./controller/company.controller";

routerAdmin.get("/", companyController.goHome);

routerAdmin.get("/login", companyController.getLogin);

routerAdmin.get("/signup", companyController.getSignup);

export default routerAdmin;