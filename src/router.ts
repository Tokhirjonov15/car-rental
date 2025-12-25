import express, { Response, Request } from "express";
import userController from "./controller/user.controller";
const router = express.Router();

/** USER */
router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post("/user/detail", userController.verifyAuth);

export default router;