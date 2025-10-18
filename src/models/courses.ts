import { prisma } from "../config/prismaClient";
import pool from "../config/db";
import type { CourseDTO } from "../dto/courseDTO";

export const getAllCourses = async () => {
  const SQLQuery = "select * from course_base";
  return await pool.query(SQLQuery);
};

export const getCourseById = async (courseId: number) => {
  const SQLQuery = `select * from course_base where course_id=$1;`;
  const value = [courseId];

  return await pool.query(SQLQuery, value);
};

export const createCourse = async (body: CourseDTO) => {
  const queryMaxId = "select max(course_id) from course_base";
  const maxIdResult = await pool.query(queryMaxId);
  const maxId = maxIdResult.rows[0].max || 0;
  const newId = maxId + 1;

  const now = new Date().toISOString();
  const createdAt = now;
  const updatedAt = null;

  const SQLQuery = `insert into course_base(
      course_id, course_name, description, user_id, rating, 
      category_id, review_count, price, duration, 
      certificate, "createdat", "updatedat"
    )  values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`;

  const values = [
    newId,
    body.course_name,
    body.description,
    body.user_id,
    body.rating,
    body.category_id,
    body.review_count,
    body.price,
    body.duration,
    body.certificate,
    createdAt,
    updatedAt,
  ];
  return await pool.query(SQLQuery, values);
};

export const updateCourseById = async (body: CourseDTO, courseId: number) => {
  const now = new Date().toISOString();
  const updatedAt = now;

  const SQLQuery = `update course_base set course_name=$1, description=$2, category_id=$3, price=$4, duration=$5, certificate=$6, "updatedat"=$7 where course_id=$8 RETURNING *;`;

  const value = [
    body.course_name,
    body.description,
    body.category_id,
    body.price,
    body.duration,
    body.certificate,
    updatedAt,
    courseId,
  ];
  return await pool.query(SQLQuery, value);
};

export const deleteCourseById = async (courseId: number) => {
  const SQLQuery = `delete from course_base where course_id=$1`;
  const value = [courseId];

  return await pool.query(SQLQuery, value);
};

export const searchCourses = async (query: any) => {
  try {
    const {
      name,
      min_price,
      max_price,
      category_id,
      sortBy = "createdat",
      order = "desc",
    } = query;

    const where = {} as any;

    // Filtering conditions
    // search by name
    if (name) {
      where.course_name = { contains: name, mode: "insensitive" };
    }

    // filter by price range
    if (min_price || max_price) {
      where.price = {} as any;
      if (min_price) {
        where.price.gte = parseFloat(min_price);
      }
      if (max_price) {
        where.price.lte = parseFloat(max_price);
      }
    }
    // filter by category_id
    if (category_id) {
      where.category_id = parseInt(category_id);
    }

    // Sorting condition
    const orderBy = {} as any;
    if (sortBy && ["asc", "desc"].includes(order.toLowerCase())) {
      orderBy[sortBy] = order.toLowerCase();
    }

    const courses = await prisma.course_base.findMany({
      where,
      orderBy,
    });
    return courses;
  } catch (error) {
    console.log("Prisma error:", error);
    throw error;
  }
};
