import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/uploads/profiles", express.static("uploads/profiles")); // for storing files on server

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    success: false,
  });
});

export { app };
