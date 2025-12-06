import express, { Response, Request } from "express";
const routerAdmin = express.Router();
import companyController from "./controller/company.controller";

/** Company */
routerAdmin.get("/", companyController.goHome);
routerAdmin
  .get("/login", companyController.getLogin)
  .post("/login", companyController.processLogin);
routerAdmin
  .get("/signup", companyController.getSignup)
  .post("/signup", companyController.processSignup);

/** Car */
/** User */

export default routerAdmin;