import { Router } from "express";
import {
  callNextToken,
  completeCurrentToken,
  createQueue,
  getQueue,
  getHospitalQueues,
  missCurrentToken,
  updateQueueStatus,
  getQueueByDepartment,
} from "../controllers/queue.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/createQueue",
  verifyJWT,
  allowRoles("staff", "admin"),
  createQueue,
);

router.get(
  "/getstaffqueues",
  verifyJWT,
  allowRoles("staff"),
  getHospitalQueues,
);

router.get("/:queueId", verifyJWT, getQueue);

router.patch(
  "/:queueId/status",
  verifyJWT,
  allowRoles("admin", "staff"),
  updateQueueStatus,
);

router.post(
  "/:queueId/next",
  verifyJWT,
  allowRoles("staff", "admin"),
  callNextToken,
);

router.post(
  "/:queueId/complete-current",
  verifyJWT,
  allowRoles("staff", "admin"),
  completeCurrentToken,
);

router.post(
  "/:queueId/miss-current",
  verifyJWT,
  allowRoles("staff", "admin"),
  missCurrentToken,
);

router.get("/department/:departmentId", verifyJWT, getQueueByDepartment);

export default router;
