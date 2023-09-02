const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let JICarWash = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    planDate: {
        type: String,
    },
    planTime: {
        type: String
    },
    actualDate: {
        type: String
    },
    actualTime: {
        type: String
    },
    staffName: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("JICarWash", JICarWash);