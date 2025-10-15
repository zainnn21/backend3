import pool from "../config/db";

export const checkEmailUnique = async (email: string) => {
  const SQLQuery = `select * from user_base where email=$1;`;
  const values = [email];
  const result = await pool.query(SQLQuery, values);

  if (result.rows.length > 0) {
    throw new Error("409");
  }
};
