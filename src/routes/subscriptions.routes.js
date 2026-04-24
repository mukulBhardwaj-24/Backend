import { Router } from "express";
import { getChannelStats, getSubscribers, getSubscriptionStatus, subscribeChannel, subscribedChannels, unsubscribeChannel } from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/subscribe/:channelId").post(verifyJWT, subscribeChannel);
router.route("/unsubscribe/:channelId").post(verifyJWT, unsubscribeChannel);
router.route("/channels/subscribed").get(verifyJWT, subscribedChannels);
router.route("/channels/my-subscribers").get(verifyJWT, getSubscribers);
router.route("/channels/:channelId/subscription-status").get(verifyJWT, getSubscriptionStatus);
router.route("/channels/:channelId/stats").get(getChannelStats);

export default router;