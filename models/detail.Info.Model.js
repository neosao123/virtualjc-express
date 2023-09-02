const mongoose = require("mongoose");
let Schema = mongoose.Schema;
// Customer, vehicle, previous service

let detailedInfo = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    cname: {
        type: String,
    },
    caddress: {
        type: String,
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
    drivenBy: {
        type: Schema.Types.Mixed,
    },
    availableDate: {
        type: String,
        default: ""
    },
    availableTime: {
        type: String,
        default: ""
    },
    img_vehiclePath: {
        type: String
    },
    vehicleRegNo: {
        type: String,
        required: true
    },
    modelYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
        required: true
    },
    modelCode: {
        type: String,
        required: true,
    },
    vinNo: {
        type: String,
        required: true
    },
    colorCode: {
        type: String,
        required: false
    },
    saleDate: {
        type: String,
        default: ""
    },
    sscScInfo: {
        type: Boolean
    },
    egNumber: {
        type: String
    },
    dlrNo: {
        type: String,
        required:false
    },
    opNo: {
        type: String
    },
    completedOpNo: {
        type: String
    },
    jobType: {
        type: String,
        default: ""
    },
    RoNo: {
        type: String,
        default: ""
    },
    OdoRead: {
        type: String,
        default: ""
    },
    Payment: {
        type: String,
        default: ""
    },
    RecDate: {
        type: String,
        default: ""
    },
    RecTime: {
        type: String,
        default: ""
    },
    DelDate: {
        type: String,
        default: ""
    },
    DelTime: {
        type: String,
        default: ""
    },
    carWash: {
        type: String,
        default: ""
    },
    replacedParts: {
        type: Array,
        default: []
    },
    SA: {
        type: String,
        default: ""
    },
    tech: {
        type: String,
        default: ""
    },
    techAdvice: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("detailInfo", detailedInfo);