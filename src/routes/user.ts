import express from "express";
import * as userController from "../controller/user";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/verify-email", userController.verifyEmail);
router.get("/course", userController.getUserCourses);
router.post("/upload", userController.uploadPicture);

export default router;