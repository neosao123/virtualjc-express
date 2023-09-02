const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DiagnosticQuestionaire = Schema({
    orderNo: {
        type: String,
        required: true
    },
    category: [
        {
            name: {
                type: String,
            },
            status: {
                type: Boolean,
            },
            text: {
                type: String,
            }
        }
    ],
    ignition: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            }
        }
    ],
    fromWhen: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            },
            text: {
                type: String
            }
        }
    ],
    frequency: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            },
            text: {
                type: String
            }
        }
    ],
    place: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            },
            text: {
                type: String
            }
        }
    ],
    weather: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            },
            text: {
                type: String
            }
        }
    ],
    drivingConditions: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            },
            text: {
                type: String
            }
        },
    ],
    indicatorLamp: [
        {
            name: {
                type: String
            },
            status: {
                type: Boolean
            },
            text: {
                type: String
            }
        }
    ],
    fanspeedAuto: {
        type: Boolean,
    },
    fanspeedLow: {
        type: Boolean,
    },
    fanspeedMid: {
        type: Boolean,
    },
    fanspeedHigh: {
        type: Boolean
    },
    tempSetting: {
        type: String
    },
    recirculationAuto: {
        type: Boolean
    },
    recirculationFWD: { //Front WindShield Defrost
        type: Boolean
    },
    recirculationFWDLAF: { // Front WindShield Defrost and Lower Air Flow
        type: Boolean
    },
    recirculationUAFLAF: {  // Upper Air Flow and Lower Air Flow
        type: Boolean
    },
    recirculationUAF: { // Upper Air Flow
        type: Boolean
    },
    recirculationLAF: {   // Lower air flow
        type: Boolean
    },
    waitingForServiceKey: {
        type: String
    },
    waitingForServiceStall: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    staffName: {
        type: String
    },
    DiagnosisInspectionDetails: {
        type: String
    },
    DiagnosisStartDate: {
        type: String
    },
    DiagnosisStartTime: {
        type: String
    },
    DiagnosisEndDate: {
        type: String
    },
    DiagnosisEndTime: {
        type: String
    },
    Reproduction: {
        type: Boolean
    },
    ReproductionConfirmSymptom: {
        type: Boolean
    },
    ReproductionMemo: {
        type: String
    },
    mainCause: [
        {
            technicalInfo: Boolean,
            refNo: String,
            dtc: String,
            C: Boolean,
            P: Boolean,
            H: Boolean,
            freezefromData: Boolean,
            NA: Boolean
        }
    ],
    jobInstrunctions: {
        type: String
    },
    jobInstStaffName: {
        type: String
    },
    warrenty: {
        type: Boolean
    },
    DTR: {
        type: Boolean
    },
    requestDiagnosis: {
        type: Boolean
    },
    requestRepair: {
        type: Boolean
    },
    memo: {
        type: String
    },
    prediction: {
        type: Boolean
    },
    telephoneSupportDate: {
        type: String
    },
    telephoneSupportTime: {
        type: String
    },
    telephoneSupportStaffName: {
        type: String
    },
    visitSupportDate: {
        type: String
    },
    visitSupportTime: {
        type: String
    },
    visitSupportStaffName: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("diagnosticquestionaire", DiagnosticQuestionaire);