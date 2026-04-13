import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Index for fast lookups
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ following: 1 }); // For finding followers of a user

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
