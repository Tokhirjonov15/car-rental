import express, { Response, Request } from "express";
import userController from "./controller/user.controller";
import makeUploader from "./libs/utils/uploader";
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
router.post(
    "/user/update",
    userController.verifyAuth,
    makeUploader("users").single("userImage"),
    userController.updateUser
);

export default router;