import express from "express";
import cors from "cors";

const app = express();

// Setting up cors
const FRONTEND_URI = process.env.FRONTEND_URI;
app.use(cors({
    origin: `${FRONTEND_URI}`,
    credentials: true
}));

// Middleware for pasing json 
app.use(express.json());

// Basic '/' route
app.get("/", (req,res) => {
    res.json({
        success : true,
        message : "MediQueue Backend Running"
    });
});

export default app;