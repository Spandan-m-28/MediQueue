import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js"

const app = express();

// Setting up cors
const FRONTEND_URI = process.env.FRONTEND_URI;
app.use(cors({
    origin: `${FRONTEND_URI}`,
    credentials: true
}));

// Middleware for pasing json 
app.use(express.json());

// Routes for user
app.use("/api/auth",authRouter);
app.use("/api/auth",authRouter);

// Basic '/' route
app.get("/", (req,res) => {
    res.json({
        success : true,
        message : "MediQueue Backend Running"
    });
});

export default app;