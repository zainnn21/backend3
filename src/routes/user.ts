import express from "express";
import * as userController from "../controller/user";

const router = express.Router();

router.post("/register", userController.createUser);
router.get("/login", userController.loginUser);

export default router;