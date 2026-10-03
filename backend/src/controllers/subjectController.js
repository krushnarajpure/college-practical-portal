import Subject from "../models/Subject.js";
import { ApiError } from "../utils/errors.js";

export async function listSubjects(_req, res, next) {
  try {
    const subjects = await Subject.find().populate("departmentId", "name").sort({ name: 1 });
    res.json(subjects);
  } catch (error) {
    next(error);
  }
}

export async function createSubject(req, res, next) {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, "Subject code already exists in this department"));
    next(error);
  }
}

export async function updateSubject(req, res, next) {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!subject) throw new ApiError(404, "Subject not found");
    res.json(subject);
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, "Subject code already exists in this department"));
    next(error);
  }
}

export async function deleteSubject(req, res, next) {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) throw new ApiError(404, "Subject not found");
    res.json({ message: "Subject deleted" });
  } catch (error) {
    next(error);
  }
}
