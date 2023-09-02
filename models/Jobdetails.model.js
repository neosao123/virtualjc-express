const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let jobDetails = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        default: ""
    },
    startTime: {
        type: String,
        default: ""
    },
    startChanges: {
        type: String,
        default: ""
    },
    completionDate: {
        type: String,
        default: ""
    },
    completionTime: {
        type: String,
        default: ""
    },
    completionChanges: {
        type: String,
        default: ""
    },
    actualStartDate: {
        type: String,
        default: ""
    },
    actualStartTime: {
        type: String,
        default: ""
    },
    actualStartChanges: {
        type: String,
        default: ""
    },
    actualCompletionStartDate: {
        type: String,
        default: ""
    },
    actualCompletionStartTime: {
        type: String,
        default: ""
    },
    actualCompletionChanges: {
        type: String,
        default: ""
    },
    technicianName: {
        type: String,
        default: ""
    },
    testDrive: {
        type: Boolean,
        default: false
    },
    problemEliminated: {
        type: Boolean,
        default: false
    },
    actualClockedHours: {
        type: String,
        default: ""
    },
    confirmedByName: {
        type: String,
        default: ""
    },
    waitingForServiceKey: {
        type: String,
        default: ""
    },
    waitingForServiceStall: {
        type: String,
        default: ""
    },
    waitingForWashingKey: {
        type: String,
        default: ""
    },
    waitingForWashingStall: {
        type: String,
        default: ""
    },
    jobStopStatus: {
        type: Boolean,
        default: false
    },
    jobStop: [
        {
            planStartDate: {
                type: String,
                default: ""
            },
            planStartTime: {
                type: String,
                default: ""
            },
            planRestartDate: {
                type: String,
                default: ""
            },
            planRestartTime: {
                type: String,
                default: ""
            },
            planChanges: {
                type: String,
                default: ""
            },
            actualStartDate: {
                type: String,
                default: ""
            },
            actualStartTime: {
                type: String,
                default: ""
            },
            actualRestartDate: {
                type: String,
                default: ""
            },
            actualRestartTime: {
                type: String,
                default: ""
            },
            jobStoppageTime: {
                type: String,
                default: ""
            },
            customerContactDate: {
                type: String,
                default: ""
            },
            customerContactTime: {
                type: String,
                default: ""
            },
            others: {
                type: mongoose.Schema.Types.Mixed, String
            },
            staffName: {
                type: String,
                default: ""
            }
        }
    ],
    additionalJobsStatus: {
        type: Boolean,
        default: false
    },
    additionalJobs: [
        {
            details: {
                type: String,
                default: ""
            },
            partNo: {
                type: String,
                default: ""
            },
            quantity: {
                type: String,
                default: ""
            },
            labourHours: {
                type: String,
                default: ""
            },
            Estimation: {
                type: Number,
                default: 0
            },
        }
    ],
    DIST: {
        type: Boolean,
        default: false
    },
    additionalJobsDate: {
        type: String,
        default: ""
    },
    additionalJobsreschedule: {
        type: Boolean,
        default: false
    },
    additionalJobslabourTotal: {
        type: String,
        default: ""
    },
    additionalJobspartsTotal: {
        type: String,
        default: ""
    },
    additionalJobsGrandTotal: {
        type: String,
        default: ""
    },
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
    labourTotal: {
        type: String,
        default: ""
    },
    partsTotal: {
        type: String,
        default: ""
    },
    grandTotal: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("jobdetails", jobDetails);

