// dont use this model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let JIbasicInfo = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    priority: {
        type: Boolean
    },
    waiting: {
        type: Boolean
    },
    PM: {
        type: Boolean,
        default: false
    },
    GR: {
        type: Boolean,
        default: false
    },
    KM: {
        type: String,
        default: ""
    },
    WR: {
        type: Boolean,
        default: false,
    },
    internal: {
        type: Boolean,
        default: false
    },
    pickUp: {
        type: Schema.Types.Mixed
    },
    appointment: {
        type: Boolean,
        default: false
    },
    walkIn: {
        type: Boolean,
        default: false
    },
    receptionDate: {
        type: String,
        default: ""
    },
    receptionTime: {
        type: String,
        default: ""
    },
    receptionChanges: {
        type: String,
        default: ""
    },
    deliveryDate: {
        type: String,
        default: ""
    },
    deliveryTime: {
        tupe: String
    },
    deliveryChanges: {
        type: String,
        default: ""
    },
    RepairOrderNo: {
        type: String,
        default: ""
    },
    RepairDate: {
        type: String,
        default: ""
    },
    cname: {
        type: String,
        default: ""
    },
    caddress: {
        type: String,
        default: ""
    },
    mobileTeleNumber: {
        type: Schema.Types.Mixed,
    },
    homeTeleNumber: {
        type: Schema.Types.Mixed,
    },
    officeTeleNumber: {
        type: Schema.Types.Mixed,
    },
    cemail: {
        type: Schema.Types.Mixed,
    },
    others: {
        type: Schema.Types.Mixed,
    },
    vehicleRegNo: {
        type: String,
        default: ""
    },
    modelYear: {
        type: String,
        default: ""
    },
    modelCode: {
        type: String,
        default: ""
    },
    vinNo: {
        type: String,
        default: ""
    },
    colorCode: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("JIbasicInfo", JIbasicInfo);