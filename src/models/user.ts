import pool from "../config/db";
import type { UserBaseDTO } from "../dto/userDTO";

export const createUser = async (body: UserBaseDTO) => {
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

export const createProfileUser = async () => {};
