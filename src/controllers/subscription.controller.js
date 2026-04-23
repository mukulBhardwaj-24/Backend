import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

const subscribeChannel = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const subscriberId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(channelId)) throw new ApiError(400, "Invalid Channel Id");

    if (channelId === subscriberId.toString()) throw new ApiError(400, "You cannot subscribe to your own channel");

    const channel = await User.findById(channelId);

    if (!channel) throw new ApiError(404, "Channel Not Found");

    const checkAlreadySubscribed = await Subscription.findOne({
        subscriber : subscriberId,
        channel : channelId
    });

    if (checkAlreadySubscribed) throw new ApiError(409, "You have already subscribed the channel");

    try {
        const subscription = await (await Subscription.create({
            subscriber: subscriberId,
            channel: channelId
        })).populate("channel", "username fullName avatar")

        return res.status(201).json(new ApiResponse(201, subscription, "Subscribed Successfully"));
    } catch (error) {
        if (error.code === 11000) throw new ApiError(409, "You have already subscribed the channel");
        throw error;
    }

});

const unsubscribeChannel = asyncHandler(async (req, res) => {

    const { channelId } = req.params;
    const subscriberId = req.user._id;

    if(!mongoose.Types.ObjectId.isValid(channelId)) throw new ApiError(400, "Invalid Channel Id");

    const channel = await User.findById(channelId);

    if(!channel) throw new ApiError(404, "Channel Not Found");

    await Subscription.findOneAndDelete({
        subscriber : subscriberId,
        channel : channelId
    })

    return res.status(200).json(new ApiResponse(200, {}, "Unsubscribed Successfully"));
});

const subscribedChannels = asyncHandler(async (req, res) => {

    const subscriberId = req.user._id;

    const subs = await Subscription.find({
        subscriber : subscriberId
    }).populate("channel", "username fullName avatar");

    return res.status(200).json(new ApiResponse(200, subs, "Subscribed channels fetched successfully"));
})

export {
    subscribeChannel,
    unsubscribeChannel,
    subscribedChannels
};