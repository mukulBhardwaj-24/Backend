import { Router } from "express";
import { subscribeChannel, subscribedChannels, unsubscribeChannel } from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/subscribe/:channelId").post(verifyJWT, subscribeChannel);
router.route("/unsubscribe/:channelId").post(verifyJWT, unsubscribeChannel);
router.route("/channels").get(verifyJWT, subscribedChannels);

export default router;