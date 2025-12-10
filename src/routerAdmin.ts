import express, { Response, Request } from "express";
const routerAdmin = express.Router();
import companyController from "./controller/company.controller";
import vehicleController from "./controller/vehicle.controller";
import makeUploader from "./libs/utils/uploader";

/** Company */
routerAdmin.get("/", companyController.goHome);
routerAdmin
  .get("/login", companyController.getLogin)
  .post("/login", companyController.processLogin);
routerAdmin
  .get("/signup", companyController.getSignup)
  .post(
    "/signup",
    makeUploader("users").single("userImage"), 
    companyController.processSignup
  );

routerAdmin.get("/logout", companyController.logout);
routerAdmin.get("/check-me", companyController.checkAuthSession);


/** Vehicle */
routerAdmin.get(
  "/vehicle/all", 
  companyController.verifyCompany,
  vehicleController.getAllVehicles
);
routerAdmin.post(
  "/vehicle/create",
  companyController.verifyCompany, 
  // uploadVehicleImage.single("vehicleImage"),
  makeUploader("vehicles").array("vehicleImages", 5),
  vehicleController.createNewVehicle
);
routerAdmin.post(
  "/vehicle/:id", 
  companyController.verifyCompany,
  vehicleController.updateChosenVehicle
);

/** User */
routerAdmin.get(
  "/user/all",
  companyController.verifyCompany,
  companyController.getUsers
);

export default routerAdmin;