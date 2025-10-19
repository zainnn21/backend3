import pool from "../config/db";
import type {
  payloadDTO,
  UserBaseDTO,
  UserLoginDTO,
  UserVerifyDTO,
} from "../dto/userDTO";
import jwt from "jsonwebtoken";
import { checkEmailUnique } from "../utils/checkUniqueEmail";
import { randomUUIDv7 } from "bun";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

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
  try {
    await tokenEmailVerification(body.email);
    return { user: resultUserBase.rows[0], profile: resultProfileUser.rows[0] };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (body: UserLoginDTO) => {
  const { email, password } = body;
  const SQLQuery = `select * from user_base where email=$1;`;
  const values = [email];
  const result = await pool.query(SQLQuery, values);

  if (result.rows.length === 0) {
    throw new Error("404");
  }

  if (result.rows[0].is_verified === false){
    throw new Error("User not verified");
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

export const tokenEmailVerification = async (email: string) => {
  const expiresIn = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  const createdAt = new Date().toISOString();
  const token = randomUUIDv7();
  const SQLQuery = `insert into user_tokens(user_id, token, type, expires_at,created_at) values((select user_id from user_base where email=$1), $2, 'EMAIL_VERIFICATION', $3, $4) RETURNING *;`;
  const values = [email, token, expiresIn, createdAt];
  await pool.query(SQLQuery, values);
  sendVerificationEmail(email, token);
};

export const verifyEmail = async (data: UserVerifyDTO) => {
  const { email, token } = data;
  const SQLQuery = `select * from user_tokens where token=$1 and type='EMAIL_VERIFICATION' and user_id=(select user_id from user_base where email=$2) ORDER BY created_at DESC LIMIT 1;`;
  const values = [token, email];
  const result = await pool.query(SQLQuery, values);
  if (result.rows.length === 0) {
    throw new Error("Invalid token or email");
  }
  const tokenData = result.rows[0];
  const now = new Date();

  if (now > new Date(tokenData.expires_at)) {
    throw new Error("Token expired");
  }

  const SQLUpdate = `update user_base set is_verified=true where user_id=$1 RETURNING *;`;
  const updateValues = [tokenData.user_id];
  await pool.query(SQLUpdate, updateValues);

  const SQLDeleteToken = `delete from user_tokens where token_id=$1;`;
  await pool.query(SQLDeleteToken, [tokenData.token_id]);
};
