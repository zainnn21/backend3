import express from "express";
import * as courseController from "../controller/course";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createNewCourse);
router.put("/:id", courseController.updateCourseById);
router.delete("/:id", courseController.deleteCourseById);
export default router;
