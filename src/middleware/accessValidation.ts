import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { payloadDTO } from "../dto/userDTO";

interface ValidationRequest extends Request {
  userData: payloadDTO;
}
export const accessValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqTyped = req as ValidationRequest;
  const { authorization } = reqTyped.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Need Token" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  const secretKey = process.env.JWT_SECRET!;

  try {
    const jwtDecode = jwt.verify(token, secretKey);
    if (typeof jwtDecode !== "string") {
      reqTyped.userData = jwtDecode as payloadDTO;
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
