import type { Request, Response } from "express";
import * as userModels from "../models/user";
import type { UserBaseDTO, UserLoginDTO } from "../dto/userDTO";
import pool from "../config/db";

export const createUser = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    console.log(req.body);
    const body: UserBaseDTO = req.body;
    const result = await userModels.createUser(body);
    await client.query("COMMIT");
    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (error: any) {
    console.log(error);
    await client.query("ROLLBACK");
    if (error.message === "409") {
      return res.status(409).json({ message: "Email already in use" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const body: UserLoginDTO = req.body;
    console.log(body);
    const user = await userModels.loginUser(body);
    res.status(200).json({
      message: "Login Success",
      email: body.email,
      token: user,
    });
  } catch (error: any) {
    console.log(error);
    if (error.message === "404") {
      return res.status(404).json({ message: "User not found" });
    } else if (error.message === "401") {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const verifyEmail = async (req: Request, res: Response) => {};

export const getUserCourses = async (req: Request, res: Response) => {};

export const uploadPicture = async (req: Request, res: Response) => {};
