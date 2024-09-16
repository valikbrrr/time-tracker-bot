import mongoose from "mongoose";

const timeTrackerMonthSchema = new mongoose.Schema({
    monthAndYear: {type: String},
    data: [{
        name: {type: String},
        id: {type: String},
        hours: {type: Number}
    }]
});

export const timeTrackerMonthModel = mongoose.model("timeTrackerMonth", timeTrackerMonthSchema);

// FIND