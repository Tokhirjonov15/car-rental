import express, { Response, Request } from "express";
import userController from "./controller/user.controller";
import makeUploader from "./libs/utils/uploader";
import vehicleController from "./controller/vehicle.controller";
const router = express.Router();

/** USER */
router.get("/user/company", userController.getCompany);
router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post(
    "/user/logout", 
    userController.verifyAuth, 
    userController.logout 
);
router.get(
    "/user/detail", 
    userController.verifyAuth,
    userController.getUserDetail
);
router.post(
    "/user/update",
    userController.verifyAuth,
    makeUploader("users").single("userImage"),
    userController.updateUser
);

/** VEHICLES */
router.get("/vehicle/top-vehicles", vehicleController.getTopVehicles);
router.get("/vehicle/all", vehicleController.getVehicles);

export default router;