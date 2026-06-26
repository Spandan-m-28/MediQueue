import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import hospitalRouter from "./routes/hospital.routes.js";
import departmentRouter from "./routes/department.routes.js";
import queueRouter from "./routes/queue.routes.js";
import tokenRouter from "./routes/token.routes.js";

const app = express();

// Setting up cors
const FRONTEND_URI = process.env.FRONTEND_URI;
app.use(
  cors({
    origin: `${FRONTEND_URI}`,
    credentials: true,
  }),
);

// Middleware for pasing json
app.use(express.json());

// Routes for user
app.use("/api/auth", authRouter);
app.use("/api/test", authRouter);

// Router for Hospital
app.use("/api/hospital", hospitalRouter);

// Router for Department
app.use("/api/department", departmentRouter);

// Router for Queue
app.use("/api/queue", queueRouter);

// Router for Token
app.use("/api/token", tokenRouter);

// Basic '/' route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MediQueue Backend Running",
  });
});

export default app;
