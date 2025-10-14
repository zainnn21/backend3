import type { NextFunction } from "express";

export const accessValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorizaion } = req.headers;
};
