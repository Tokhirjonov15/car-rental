import express, { Response, Request } from "express";
import userController from "./controller/user.controller";
const router = express.Router();

/** USER */
router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post(
    "/user/logout", 
    userController.verifyAuth, 
    userController.logout 
);
router.post("/user/detail", userController.verifyAuth);

export default router;