import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getMyToken,
  joinQueue,
  leaveQueue,
  getCurrentActiveToken,
} from "../controllers/token.controller.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/:queueId/join", verifyJWT, joinQueue);
router.get("/my", verifyJWT, getMyToken);
router.patch("/:queueId/leave", verifyJWT, leaveQueue);
router.get(
  "/:queueId/current-token",
  verifyJWT,
  allowRoles("staff", "admin"),
  getCurrentActiveToken,
);

export default router;