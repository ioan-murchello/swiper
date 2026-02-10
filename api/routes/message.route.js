import { Router } from "express";
import {
  sendMessageHandler,
  getConversationHandler,
} from "../controller/messge.controller.js";
import { protectRoute } from "../middleware/auth.js";

const router = Router();
router.use(protectRoute);
router.post("/send", sendMessageHandler);
router.get("/conversation/:userId", getConversationHandler);

export default router;
