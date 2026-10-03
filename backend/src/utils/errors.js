export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function notFound(_req, _res, next) {
  next(new ApiError(404, "Route not found"));
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = status >= 500 ? "Internal server error" : err.message;
  res.status(status).json({ message });
}
