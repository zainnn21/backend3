import express from "express";
import * as courseController from "../controller/course";
import { accessValidation } from "../middleware/accessValidation";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", accessValidation, courseController.createNewCourse);
router.put("/:id", courseController.updateCourseById);
router.delete("/:id", courseController.deleteCourseById);
export default router;
