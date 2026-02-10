import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile } from "../controller/user.controller.js";

const router = Router();

router.put("/update", protectRoute, updateProfile);

export default router;
