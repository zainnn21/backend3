import type { CourseDTO } from "../dto/courseDTO";
import * as courseModels from "../models/courses";
import type { Response, Request } from "express";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const result = await courseModels.getAllCourses();
    res
      .status(200)
      .json({ message: "Successfully retrieving data", data: result.rows });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed retrieving data", serverError: err });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await courseModels.getCourseById(id);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Course with id ${id} not found` });
    }

    res.status(200).json({
      message: "Successfully retrieving data",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed retrieving data", serverError: error });
  }
};

export const createNewCourse = async (req: Request, res: Response) => {
  try {
    const body: CourseDTO = req.body;
    if (!body.course_name || !body.price) {
      return res.status(400).json({
        message:
          "Request body is missing required fields (e.g., course_name, price)",
      });
    }
    const result = await courseModels.createCourse(body);

    res.status(201).json({
      message: "Create new course success",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed create new data", serverError: error });
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  try {
    const body: CourseDTO = req.body;
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await courseModels.updateCourseById(body, id);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Course with id ${id} not found` });
    }

    res.status(200).json({
      message: "Update course success",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed update data", serverError: error });
  }
};

export const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await courseModels.deleteCourseById(id);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Course with id ${id} not found` });
    }

    res.status(200).json({
      message: "Delete course success",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed delete data", serverError: error });
  }
};
