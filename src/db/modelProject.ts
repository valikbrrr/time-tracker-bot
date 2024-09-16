import mongoose from "mongoose";

const timeTrackerProjSchema = new mongoose.Schema({
    project: {type: String},
    data: [{
        name: {type: String},
        id: {type: String},
        hours: {type: Number}
    }]
});

export const timeTrackerProjModel = mongoose.model("timeTrackerProject", timeTrackerProjSchema);

// [
//     month: [{
//         name: {type: String},
//         id: {type: Number},
//         hours: {type: Number}
//     }]
//     ]