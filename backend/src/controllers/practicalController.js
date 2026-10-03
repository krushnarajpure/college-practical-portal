import { ApiError } from "../utils/errors.js";
import Practical from "../models/Practical.js";

function buildSearchQuery(search) {
  if (!search) return {};
  const safeSearch = search.trim();
  if (!safeSearch) return {};

  const number = Number(safeSearch);
  const regex = new RegExp(safeSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const searchRules = [
    { title: regex },
    { topic: regex },
    { theory: regex },
    { algorithm: regex },
  ];
  if (!Number.isNaN(number)) searchRules.push({ practicalNumber: number });
  return { $or: searchRules };
}

export async function listPracticals(req, res, next) {
  try {
    const { search, filter, status, includeDraft } = req.query;
    const query = { ...buildSearchQuery(search) };

    if (filter && filter !== "All") query.topic = filter;

    if (includeDraft === "true") {
      if (status) query.status = status;
    } else {
      query.status = "Published";
    }

    const practicals = await Practical.find(query)
      .populate("subjectId", "name code semester")
      .populate("departmentId", "name")
      .sort({ practicalNumber: 1 });

    res.json(practicals);
  } catch (error) {
    next(error);
  }
}

export async function getPractical(req, res, next) {
  try {
    const practical = await Practical.findById(req.params.id)
      .populate("subjectId", "name code semester")
      .populate("departmentId", "name");

    if (!practical) throw new ApiError(404, "Failed to load practical");
    res.json(practical);
  } catch (error) {
    next(error);
  }
}

export async function createPractical(req, res, next) {
  try {
    const practical = await Practical.create(req.body);
    res.status(201).json(practical);
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, "Practical number already exists in this subject"));
    next(error);
  }
}

export async function updatePractical(req, res, next) {
  try {
    const practical = await Practical.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!practical) throw new ApiError(404, "Failed to load practical");
    res.json(practical);
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, "Practical number already exists in this subject"));
    next(error);
  }
}

export async function deletePractical(req, res, next) {
  try {
    const practical = await Practical.findByIdAndDelete(req.params.id);
    if (!practical) throw new ApiError(404, "Failed to load practical");
    res.json({ message: "Practical deleted" });
  } catch (error) {
    next(error);
  }
}
