import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const timestamp = new Date().getTime();
      const fileName = file.originalname;
      cb(null, `${timestamp}-${fileName}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, //5MB
  },
});
