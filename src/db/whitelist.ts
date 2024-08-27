import mongoose from "mongoose";

const whitelistSchema = new mongoose.Schema({
    admins: [{
        id: {type: Number},
    }],
    users: [{
        id: {type: Number},
    }]
});

export const whitelistModel = mongoose.model("whitelist", whitelistSchema);