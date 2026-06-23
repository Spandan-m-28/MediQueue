import { Router } from "express";
import { createQueue, getQueue, updateQueueStatus } from "../controllers/queue.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/createQueue",
  verifyJWT,
  allowRoles("staff", "admin"),
  createQueue,
);
router.get("/:queueId", verifyJWT, getQueue);
router.patch("/:queueId/status",verifyJWT,allowRoles("admin","staff"),updateQueueStatus);

export default router;
