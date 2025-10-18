import express from "express";
import * as multerMiddleware from "../middleware/multer";
import * as uploadContoller from "../controller/upload";
import * as errorMiddlware from "../middleware/error";
import * as accessValidationMiddleware from "../middleware/accessValidation";

const router = express.Router();

router.post(
  "/file",
  accessValidationMiddleware.accessValidation,
  multerMiddleware.upload.single("file"),
  uploadContoller.uploadFile,
  errorMiddlware.errorHandler
);
export default router;
