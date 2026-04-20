import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },

    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },

    validate : {
        validator : function(channelId)
        {
            return channelId.toString() !== this.subscriber.toString();
        },
        message : "You cannot subscribe to yourself"
    }
}, { timestamps: true });

subscriptionSchema.index(
    {
        subscriber: 1,
        channel: 1
    },
    {
        unique: true
    }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema);

export { Subscription };