import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errors.js";

export function requireAuth(req, _res, next) {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = req.cookies?.adminToken || bearer;

  if (!token) return next(new ApiError(401, "Session expired"));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch {
    next(new ApiError(401, "Session expired"));
  }
}
