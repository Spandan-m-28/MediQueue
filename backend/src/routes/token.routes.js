import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMyToken, joinQueue } from "../controllers/token.controller.js";

const router = Router();

router.post("/:queueId/join", verifyJWT, joinQueue);
router.get("/my", verifyJWT, getMyToken);

export default router;
