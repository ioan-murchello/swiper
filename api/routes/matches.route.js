import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  swipeRight,
  swipeLeft,
  getMatches,
  getUserProfiles,
} from "../controller/matches.controller.js";

const router = Router();

router.post("/swipe-right/:id", protectRoute, swipeRight);
router.post("/swipe-left/:id", protectRoute, swipeLeft);

router.get("/", protectRoute, getMatches);
router.get("/user-profiles", protectRoute, getUserProfiles);

export default router;
