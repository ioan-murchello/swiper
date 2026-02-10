import { Router } from "express";
import { login, signup, logout } from "../controller/auth.controller.js"; 
import { protectRoute } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me",protectRoute, (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
