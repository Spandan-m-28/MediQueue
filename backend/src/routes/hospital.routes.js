import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  createHospital,
  getAllHospitals,
  getHospitalById,
} from "../controllers/hospital.controller.js";

const router = Router();

router.post(
  "/createHospital",
  verifyJWT,
  allowRoles("staff", "admin"),
  createHospital,
);
router.get("/", verifyJWT, getAllHospitals);
router.get("/:id", getHospitalById);
export default router;
