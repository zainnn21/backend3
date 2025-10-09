import type { Request, Response } from "express";
import * as userModels from "../models/user";
import type { UserBaseDTO } from "../dto/userDTO";
import pool from "../config/db";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    console.log(req.body);
    const body: UserBaseDTO = req.body;
    const result = await userModels.createUser(body);
    await client.query("COMMIT");
    res.status(201).json({ message: "User created successfully", data: result });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req:Request, res:Response) =>{
  try {
    const JWT_SECRET = process.env.JWT_SECRET
  } catch (error) {
    
  }
}
