const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BasicInfoSchema = new Schema({
    priority: {
        type: Boolean,
        default: false
    },
    waiting: {
        type: Boolean,
        default: false
    },
    PM: {
        type: Boolean,
        default: false,
    },
    KM: {
        type: String,
        default: ""
    },
    GR: {
        type: Boolean,
        default: false,
    },
    WR: {
        type: Boolean,
        default: false,
    },
    internal: {
        type: Boolean,
        default: false,
    },
    pickUp: {
        type: Schema.Types.Mixed
    },
    appointment: {
        type: Boolean,
        default: false,
    },
    walkIn: {
        type: Boolean,
        default: false,
    },
    receptionDate: {
        type: String,
    },
    receptionTime: {
        type: String,
        default: "",
    },
    receptionChanges: {
        type: String,
        default: "",
    },
    deliveryDate: {
        type: String,
        default: "",
    },
    deliveryTime: {
        type: String,
        default: "",
    },
    deliveryChanges: {
        type: String,
        default: "",
    },
    RepairOrderNo: {
        type: String,
        default: "",
    },
    RepairOrderDate: {
        type: String,
        default: "",
    },
    serviceInvitation: {
        type: String,
    },
    serviceInvitationDate: {
        type: String,
    },
    BOparts: {
        type: String,
        default: "",
    },
    BOpartsStaffName: {
        type: String,
        default: "",
    },
    appointmentConfirmation: {
        type: String,
        default: "",
    },
    appointmentConfirmationStaffName: {
        type: String,
        default: "",
    },
    partsOrdered: {
        type: String,
        default: "",
    },
    partsOrderedStaffName: {
        type: String,
        default: "",
    },
    partsConfirmed: {
        type: String,
        default: "",
    },
    partsConfirmedStaffName: {
        type: String,
        default: "",
    },
    orderNo: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "inProgress"
    },
    basicInfoStep: {
        type: Boolean,
        default: false
    },
    detailInfoStep: {
        type: Boolean,
        default: false
    },
    customweRequestStep: {
        type: Boolean,
        default: false
    },
    jobDetailsStep: {
        type: Boolean,
        default: false
    },
    otherDetailsStep: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

module.exports = mongoose.model("BasicInfo", BasicInfoSchema);