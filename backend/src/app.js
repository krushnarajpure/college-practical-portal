import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import practicalRoutes from "./routes/practicalRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import { errorHandler, notFound } from "./utils/errors.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/practicals", practicalRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
