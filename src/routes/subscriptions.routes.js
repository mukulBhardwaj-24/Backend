import { Router } from "express";
import { subscribeChannel } from "../controllers/subscription.controller.js";

const router = Router();

router.post("/subscribe/:channelId", subscribeChannel);
router.post("/unsubscribe/:channelId");

export default router;