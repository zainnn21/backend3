import type { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    res.status(200).json({
      message: "File uploaded successfully",
      filename: file.originalname,
      path: file.path,
      size: file.size,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", serverError: error });
  }
};
