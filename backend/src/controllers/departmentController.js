import Department from "../models/Department.js";
import { ApiError } from "../utils/errors.js";

export async function listDepartments(_req, res, next) {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (error) {
    next(error);
  }
}

export async function createDepartment(req, res, next) {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, "Department already exists"));
    next(error);
  }
}

export async function updateDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!department) throw new ApiError(404, "Department not found");
    res.json(department);
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, "Department already exists"));
    next(error);
  }
}

export async function deleteDepartment(req, res, next) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) throw new ApiError(404, "Department not found");
    res.json({ message: "Department deleted" });
  } catch (error) {
    next(error);
  }
}
