import pool from "../config/db";
import type { payloadDTO, UserBaseDTO, UserLoginDTO } from "../dto/userDTO";
import jwt from "jsonwebtoken";
import { checkEmailUnique } from "../utils/checkUniqueEmail";

export const createUser = async (body: UserBaseDTO) => {
  await checkEmailUnique(body.email);
  const passwordHash = await Bun.password.hash(body.password);

  const SQLQuery = `insert into user_base(email, role_id, password, username) values($1, $2, $3, $4) RETURNING *;`;
  const values = [body.email, body.role_id, passwordHash, body.username];
  const resultUserBase = await pool.query(SQLQuery, values);

  const newId = resultUserBase.rows[0].user_id;
  const now = new Date().toISOString();

  const SQLQueryProfile = `insert into profile_user(fullname, no_hp, job, user_id, working_place,country_code,gender, created_date) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
  const valuesProfile = [
    body.fullname,
    body.no_hp,
    body.job,
    newId,
    body.working_place,
    body.country_code,
    body.gender,
    now,
  ];

  const resultProfileUser = await pool.query(SQLQueryProfile, valuesProfile);
  return { user: resultUserBase.rows[0], profile: resultProfileUser.rows[0] };
};

export const loginUser = async (body: UserLoginDTO) => {
  const { email, password } = body;
  const SQLQuery = `select * from user_base where email=$1;`;
  const values = [email];
  const result = await pool.query(SQLQuery, values);

  if (result.rows.length === 0) {
    throw new Error("404");
  }

  console.log(password, result.rows[0].password);
  const isPasswordValid = await Bun.password.verify(
    password,
    result.rows[0].password
  );

  console.log(isPasswordValid);

  if (isPasswordValid) {
    const payload: payloadDTO = {
      user_id: result.rows[0].user_id,
      email: result.rows[0].email,
      role_id: result.rows[0].role_id,
      username: result.rows[0].username,
    };
    const secret = process.env.JWT_SECRET!;
    const expiresIn = "1h";
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
  } else {
    throw new Error("401");
  }
};
