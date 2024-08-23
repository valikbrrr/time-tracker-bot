import mongoose from "mongoose";

const timeTrackerSchema = new mongoose.Schema({
    name: {type: String},
    id: {type: Number},
    hours: {type: Number}
});



export const timeTrackerModel = mongoose.model("timeTracker", timeTrackerSchema);

// FIND