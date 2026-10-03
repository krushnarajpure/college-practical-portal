import { validationResult } from "express-validator";
import { ApiError } from "../utils/errors.js";

export function validate(req, _res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const message = result
      .array()
      .map((item) => item.msg)
      .join(", ");
    return next(new ApiError(400, message || "Invalid input"));
  }
  next();
}
