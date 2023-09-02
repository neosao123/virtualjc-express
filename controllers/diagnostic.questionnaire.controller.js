const BasicInfo = require("../models/BasicInfo.Model");
const DiagnosticQuestionaireModel = require("../models/Diagnostic.Questionaire.Model");

exports.create = async (req, res) => {
    try {
        const {
            orderNo,
            category,
            ignition,
            fromWhen,
            frequency,
            place,
            weather,
            drivingConditions,
            indicatorLamp,
            fanspeedAuto,
            fanspeedLow,
            fanspeedMild,
            fanspeedHigh,
            tempSetting,
            recirculationAuto,
            recirculationFWD,
            recirculationFWDLAF,
            recirculationUAFLAF,
            recirculationUAF,
            recirculationLAF,
            waitingForServiceKey,
            waitingForServiceStall,
            date,
            time,
            staffName,
            DiagnosisInspectionDetails,
            DiagnosisStartDate,
            DiagnosisStartTime,
            DiagnosisEndDate,
            DiagnosisEndTime,
            Reproduction,
            ReproductionConfirmSymptom,
            ReproductionMemo,
            mainCause,
            jobInstrunctions,
            jobInstStaffName,
            warrenty,
            DTR,
            requestDiagnosis,
            requestRepair,
            memo,
            prediction,
            telephoneSupportDate,
            telephoneSupportTime,
            telephoneSupportStaffName,
            visitSupportDate,
            visitSupportTime,
            visitSupportStaffName


        } = req.body;
        let existingOrderNo = await BasicInfo.findOne({ orderNo, otherDetailsStep: true });

        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Please fill other details" });
        } else {
            let existingJobDetails = await DiagnosticQuestionaireModel.findOne({ orderNo });
            if (existingJobDetails) {
                let updateData = {
                    category: [],
                    ignition: [],
                    fromWhen: [],
                    frequency: [],
                    place: [],
                    weather: [],
                    drivingConditions: [],
                    indicatorLamp: [],
                    fanspeedAuto,
                    fanspeedLow,
                    fanspeedMild,
                    fanspeedHigh,
                    tempSetting,
                    recirculationAuto,
                    recirculationFWD,
                    recirculationFWDLAF,
                    recirculationUAFLAF,
                    recirculationUAF,
                    recirculationLAF,
                    waitingForServiceKey,
                    waitingForServiceStall,
                    date,
                    time,
                    staffName,
                    DiagnosisInspectionDetails,
                    DiagnosisStartDate,
                    DiagnosisStartTime,
                    DiagnosisEndDate,
                    DiagnosisEndTime,
                    Reproduction,
                    ReproductionConfirmSymptom,
                    ReproductionMemo,
                    mainCause: [],
                    jobInstrunctions,
                    jobInstStaffName,
                    warrenty,
                    DTR,
                    requestDiagnosis,
                    requestRepair,
                    memo,
                    prediction,
                    telephoneSupportDate,
                    telephoneSupportTime,
                    telephoneSupportStaffName,
                    visitSupportDate,
                    visitSupportTime,
                    visitSupportStaffName
                }
                for (let i = 0; i < category.length; i++) {
                    updateData.category.push({
                        name: category[i].name,
                        status: category[i].status,
                        text: category[i].text
                    });
                }
                for (let i = 0; i < ignition.length; i++) {
                    updateData.ignition.push({
                        name: ignition[i].name,
                        status: ignition[i].status,
                    });
                }
                for (let i = 0; i < fromWhen.length; i++) {
                    updateData.fromWhen.push({
                        name: fromWhen[i].name,
                        status: fromWhen[i].status,
                        text: fromWhen[i].text,
                    });
                }
                for (let i = 0; i < frequency.length; i++) {
                    updateData.frequency.push({
                        name: frequency[i].name,
                        status: frequency[i].status,
                        text: frequency[i].text,
                    });
                }
                for (let i = 0; i < place.length; i++) {
                    updateData.place.push({
                        name: place[i].name,
                        status: place[i].status,
                        text: place[i].text,
                    });
                }
                for (let i = 0; i < weather.length; i++) {
                    updateData.weather.push({
                        name: weather[i].name,
                        status: weather[i].status,
                        text: weather[i].text,
                    });
                }
                for (let i = 0; i < drivingConditions.length; i++) {
                    updateData.drivingConditions.push({
                        name: drivingConditions[i].name,
                        status: drivingConditions[i].status,
                        text: drivingConditions[i].text,
                    });
                }
                for (let i = 0; i < indicatorLamp.length; i++) {
                    updateData.indicatorLamp.push({
                        name: indicatorLamp[i].name,
                        status: indicatorLamp[i].status,
                        text: indicatorLamp[i].text,
                    });
                }

                for (let i = 0; i < mainCause.length; i++) {
                    updateData.mainCause.push({
                        technicalInfo: mainCause[i].technicalInfo,
                        refNo: mainCause[i].refNo,
                        dtc: mainCause[i].dtc,
                        C: mainCause[i].C,
                        P: mainCause[i].P,
                        H: mainCause[i].H,
                        freezefromData: mainCause[i].freezefromData,
                        NA: mainCause[i].NA,
                    });
                }

                const diagnosticquestionaire = await DiagnosticQuestionaireModel.findOneAndUpdate({ orderNo }, updateData, { new: true });
                if (!diagnosticquestionaire) {
                    res.status(300).json({ err: 300, msg: "Failed to update data." });
                    return;
                }                
                res.status(200).json({ err: 200, msg: "Info updated successfully", data: diagnosticquestionaire });
            } else {
                const newDiagnosticQuestionaire = new DiagnosticQuestionaireModel({
                    orderNo,
                    category: [],
                    ignition: [],
                    fromWhen: [],
                    frequency: [],
                    place: [],
                    weather: [],
                    drivingConditions: [],
                    indicatorLamp: [],
                    fanspeedAuto,
                    fanspeedLow,
                    fanspeedMild,
                    fanspeedHigh,
                    tempSetting,
                    recirculationAuto,
                    recirculationFWD,
                    recirculationFWDLAF,
                    recirculationUAFLAF,
                    recirculationUAF,
                    recirculationLAF,
                    waitingForServiceKey,
                    waitingForServiceStall,
                    date,
                    time,
                    staffName,
                    DiagnosisInspectionDetails,
                    DiagnosisStartDate,
                    DiagnosisStartTime,
                    DiagnosisEndDate,
                    DiagnosisEndTime,
                    Reproduction,
                    ReproductionConfirmSymptom,
                    ReproductionMemo,
                    mainCause,
                    jobInstrunctions,
                    jobInstStaffName,
                    warrenty,
                    DTR,
                    requestDiagnosis,
                    requestRepair,
                    memo,
                    prediction,
                    telephoneSupportDate,
                    telephoneSupportTime,
                    telephoneSupportStaffName,
                    visitSupportDate,
                    visitSupportTime,
                    visitSupportStaffName
                });
                for (let i = 0; i < category.length; i++) {
                    newDiagnosticQuestionaire.category.push({
                        name: category[i].name,
                        status: category[i].status,
                        text: category[i].text
                    });
                }
                for (let i = 0; i < ignition.length; i++) {
                    newDiagnosticQuestionaire.ignition.push({
                        name: ignition[i].name,
                        status: ignition[i].status,
                        text: ignition[i].text
                    });
                }
                for (let i = 0; i < fromWhen.length; i++) {
                    newDiagnosticQuestionaire.fromWhen.push({
                        name: fromWhen[i].name,
                        status: fromWhen[i].status,
                        text: fromWhen[i].text
                    });
                }
                for (let i = 0; i < frequency.length; i++) {
                    newDiagnosticQuestionaire.frequency.push({
                        name: frequency[i].name,
                        status: frequency[i].status,
                        text: frequency[i].text
                    });
                }
                for (let i = 0; i < place.length; i++) {
                    newDiagnosticQuestionaire.place.push({
                        name: place[i].name,
                        status: place[i].status,
                        text: place[i].text
                    });
                }
                for (let i = 0; i < weather.length; i++) {
                    newDiagnosticQuestionaire.weather.push({
                        name: weather[i].name,
                        status: weather[i].status,
                        text: weather[i].text
                    });
                }
                for (let i = 0; i < drivingConditions.length; i++) {
                    newDiagnosticQuestionaire.drivingConditions.push({
                        name: drivingConditions[i].name,
                        status: drivingConditions[i].status,
                        text: drivingConditions[i].text
                    });
                }
                for (let i = 0; i < indicatorLamp.length; i++) {
                    newDiagnosticQuestionaire.indicatorLamp.push({
                        name: indicatorLamp[i].name,
                        status: indicatorLamp[i].status,
                        text: indicatorLamp[i].text
                    });
                }
                for (let i = 0; i < mainCause.length; i++) {
                    newDiagnosticQuestionaire.mainCause.push({
                        technicalInfo: mainCause[i].technicalInfo,
                        refNo: mainCause[i].refNo,
                        dtc: mainCause[i].dtc,
                        C: mainCause[i].C,
                        P: mainCause[i].P,
                        H: mainCause[i].H,
                        freezefromData: mainCause[i].freezefromData,
                        NA: mainCause[i].NA,
                    });
                }
                newDiagnosticQuestionaire.save().then(async (result) => {
                    res.status(200).json({ err: 200, msg: "Info added successfully", data: result });
                    let statusUpdate = await BasicInfo.findOneAndUpdate({ orderNo }, { status: "Completed" }, { new: true });
                });
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}