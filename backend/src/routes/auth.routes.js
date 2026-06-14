import { Router } from "express";
import { loginUser, registerUser , me} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",verifyJWT, me);
router.get("/staff-test",verifyJWT,allowRoles("staff"),(req,res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome Staff"
    });
});

export default router;