import { Router } from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById
} from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/createDepartment",
  verifyJWT,
  allowRoles("staff", "admin"),
  createDepartment,
);
router.get("/:hospitalId", verifyJWT, getDepartments);
router.get("/details/:departmentId", verifyJWT, getDepartmentById);

export default router;
