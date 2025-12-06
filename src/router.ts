import express, { Response, Request } from "express";
import userController from "./controller/user.controller";
const router = express.Router();

router.post("/login", userController.login);
router.post("/signup", userController.signup);

export default router;