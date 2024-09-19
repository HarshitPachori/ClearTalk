import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["*"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);

export { app };
