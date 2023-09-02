const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerRequest = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    customerRequest: {
        type: String,
        default: ""
    },
    requestForTA: {
        type: Boolean,
        default: false
    },
    requestDate: {
        type: String,
        default: ""
    },
    requestTime: {
        type: String,
        default: ""
    },
    appointment: {
        type: Boolean,
        default: false
    },
    appointmentDate: {
        type: String,
        default: ""
    },
    appointmentTime: {
        type: String,
        default: ""
    },
    staffName: {
        type: String,
        default: ""
    },
    diagnosticQuestionnaire: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("customerRequests", customerRequest);