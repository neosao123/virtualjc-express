const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let JIjobDetails = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    startDate: String,
    startTime: String,
    startChanges: String,
    completionDate: String,
    completionTime: String,
    completionChanges: String,
    actualStartDate: String,
    actualStartTime: String,
    actualStartChanges: String,
    actualCompletionStartDate: String,
    actualCompletionStartTime: String,
    actualCompletionChanges: String,
    technicianName: String,
    testDrive: Boolean,
    problemEliminated: Boolean,
    actualClockedHours: String,
    confirmedByName: String,
    waitingForServiceKey: String,
    waitingForServiceStall: String,
    waitingForWashingKey: String,
    waitingForWashingStall: String,
    jobStopStatus: Boolean,
    jobStop: [
        {
            planStartDate: String,
            planStartTime: String,
            planRestartDate: String,
            planRestartTime: String,
            planChanges: String,
            actualStartDate: String,
            actualStartTime: String,
            actualRestartDate: String,
            actualRestartTime: String,
            jobStoppageTime: String,
            customerContactDate: String,
            customerContactTime: String,
            others: mongoose.Schema.Types.Mixed,
            staffName: String
        }
    ],
    additionalJobsStatus: Boolean,
    additionalJobs: [
        {
            details: String,
            partNo: String,
            quantity: Number,
            labourHours: Number,
            Estimation: Number,
        }
    ],
    DIST: Boolean,
    additionalJobsDate: String,
    additionalJobsreschedule: Boolean,
    additionalJobslabourTotal: String,
    additionalJobspartsTotal: String,
    additionalJobsGrandTotal: String,
    jobdetails_partReplace: [{
        details: {
            type: String,
            default: ""
        },
        partNo: {
            type: String,
            default: ""
        },
        quantity: {
            type: Number,
        },
        labourHours: {
            type: Number
        },
        Estimation: {
            type: Number,
        },
        results: {
            type: mongoose.Schema.Types.Mixed
        }
    }],
    labourTotal: String,
    partsTotal: String,
    grandTotal: String
}, {
    timestamps: true
});
module.exports = mongoose.model("JIjobdetails", JIjobDetails);