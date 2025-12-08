import express, { Response, Request } from "express";
const routerAdmin = express.Router();
import companyController from "./controller/company.controller";
import vehicleController from "./controller/vehicle.controller";

/** Company */
routerAdmin.get("/", companyController.goHome);
routerAdmin
  .get("/login", companyController.getLogin)
  .post("/login", companyController.processLogin);
routerAdmin
  .get("/signup", companyController.getSignup)
  .post("/signup", companyController.processSignup);

routerAdmin.get("/logout", companyController.logout);
routerAdmin.get("/check-me", companyController.checkAuthSession);


/** Vehicle */
routerAdmin.get("/vehicle/all", vehicleController.getAllVehicles);
routerAdmin.post("/vehicle/create", vehicleController.createNewVehicle);
routerAdmin.post("/vehicle/:id", vehicleController.updateChosenVehicle);
/** User */

export default routerAdmin;