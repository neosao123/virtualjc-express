const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let JIDeliveryInfo = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    cleanlynessExternalInternal: {
        type: Boolean
    },
    protectiveCoverRemoval: {
        type: Boolean
    },
    outerMirrorSeatPostiion: {
        type: Boolean
    },
    clockAudiioAdjust: {
        type: Boolean
    },
    floorMatProperInstallation: {
        type: Boolean
    },
    symptomResolutionGR: {
        type: Boolean
    },
    odometerReadingOut: {
        type: String
    },
    jobCompletionDate: {
        type: String
    },
    jobCompletionTime: {
        type: String
    },
    jobResulutExplanation: {
        type: Boolean
    },
    invoiceExplaination: {
        type: Boolean
    },
    floorMatConformation: {
        type: Boolean
    },
    resultSymptomResolution: {
        type: Boolean
    },
    deliveryDate: {
        type: String
    },
    deliveryTime: {
        type: String
    },
    owner: {
        type: Boolean
    },
    family: {
        type: Boolean
    },
    others: {
        type: Schema.Types.Mixed
    },
    doneByName: {
        type: String
    },
    confirmedByName: {
        type: String
    },
    staffName: {
        type: String
    },
    locationCodeKey: {
        type: String
    },
    locationCodeStall: {
        type: String
    },
    locationCodeStaffName: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("JIdeliveryinfo", JIDeliveryInfo);