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
router.get(
    "/user/detail", 
    userController.verifyAuth,
    userController.getUserDetail
);

export default router;