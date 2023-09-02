const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let JIPostSrviceFollowUp = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    planDate: {
        type: String
    },
    planTime: {
        type: String
    },
    contactInfo: [
        {
            name: String,
            status: Boolean,
            text: String,
        }
    ],
    actualDate: {
        type: String
    },
    actualTime: {
        type: String
    },
    result: [
        {
            name: String,
            status: Boolean,
            text: String,
        }
    ],
    staffName: {
        type: String
    },
    confimedBy: {
        type: String
    },
    customerPreferences: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("jipostservicefollowup", JIPostSrviceFollowUp);
