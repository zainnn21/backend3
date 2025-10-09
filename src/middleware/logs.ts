import type { Request, Response } from "express";

export const logRequest = (req: Request, res: Response, next: Function) => {
  console.log("Log Request Method:", req.method, "Path:", req.path);
  console.log("Log Response Status: ", res.statusCode);
  next();
};
