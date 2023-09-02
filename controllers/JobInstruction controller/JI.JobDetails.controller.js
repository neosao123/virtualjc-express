const BasicInfoModel = require("../../models/BasicInfo.Model");
const JobdetailsModel = require("../../models/Jobdetails.model");


exports.get = async (req, res) => {
    try {
        const { orderNo } = req.body;
        let existingOrderNo = await BasicInfoModel.findOne({ orderNo });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Order number does not exist." });
        } else {
            let Jobdetails = await JobdetailsModel.findOne({ orderNo });
            let result = {}
            result
            res.status(200).json({ err: 200, msg: "Data Found", data: Jobdetails });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.create = async (req, res) => {
    try {
        const {
            orderNo,
            startDate,
            startTime,
            startChanges,
            completionDate,
            completionTime,
            completionChanges,
            actualStartDate,
            actualStartTime,
            actualStartChange,
            actualCompletionStartDate,
            actualCompletionStartTime,
            actualCompletionChanges,
            technicianName,
            testDrive,
            problemEliminated,
            actualClockedHours,
            confirmedByName,
            waitingForServiceKey,
            waitingForServiceStall,
            waitingForWashingKey,
            waitingForWashingStall,
            jobStopStatus,
            jobStop,
            additionalJobsStatus,
            additionalJobs,
            DIST,
            additionalJobsDate,
            additionalJobsreschedule,
            additionalJobslabourTotal,
            additionalJobspartsTotal,
            additionalJobsGrandTotal,
            jobdetails_partReplace,
            labourTotal,
            partsTotal,
            grandTotal
        } = req.body;

        let existingOrderNo = await BasicInfoModel.findOne({ orderNo });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Order number does not exist." });
        } else {
            let existingInfo = await JobdetailsModel.findOne({ orderNo });
            if (existingInfo) {
                const updateData = {
                    startDate,
                    startTime,
                    startChanges,
                    completionDate,
                    completionTime,
                    completionChanges,
                    actualStartDate,
                    actualStartTime,
                    actualStartChange,
                    actualCompletionStartDate,
                    actualCompletionStartTime,
                    actualCompletionChanges,
                    jobStopStatus,
                    additionalJobsStatus,
                    technicianName,
                    testDrive,
                    problemEliminated,
                    actualClockedHours,
                    confirmedByName,
                    waitingForServiceKey,
                    waitingForServiceStall,
                    waitingForWashingKey,
                    waitingForWashingStall,
                    jobStop: [],
                    additionalJobs: [],
                    DIST,
                    additionalJobsDate,
                    additionalJobsreschedule,
                    additionalJobslabourTotal,
                    additionalJobspartsTotal,
                    additionalJobsGrandTotal,
                    jobdetails_partReplace: [],
                    labourTotal,
                    partsTotal,
                    grandTotal
                }

                for (let i = 0; i < jobdetails_partReplace.length; i++) {
                    updateData.jobdetails_partReplace.push({
                        details: jobdetails_partReplace[i].details,
                        partNo: jobdetails_partReplace[i].partNo,
                        quantity: jobdetails_partReplace[i].quantity,
                        labourHours: jobdetails_partReplace[i].labourHours,
                        Estimation: jobdetails_partReplace[i].Estimation,
                    });
                }
                for (let i = 0; i < jobStop.length; i++) {
                    updateData.jobStop.push({
                        planStartDate: jobStop[i].planStartDate,
                        planStartTime: jobStop[i].planStartTime,
                        planRestartDate: jobStop[i].planRestartDate,
                        planRestartTime: jobStop[i].planRestartTime,
                        planChanges: jobStop[i].planChanges,
                        actualStartDate: jobStop[i].actualStartDate,
                        actualStartTime: jobStop[i].actualStartTime,
                        actualRestartDate: jobStop[i].actualRestartDate,
                        actualRestartTime: jobStop[i].actualRestartTime,
                        jobStoppageTime: jobStop[i].jobStoppageTime,
                        customerContactDate: jobStop[i].customerContactDate,
                        customerContactTime: jobStop[i].customerContactTime,
                        others: {
                            status: jobStop[i].others.status,
                            text: jobStop[i].others.text,
                        },
                        staffName: jobStop[i].staffName
                    })
                }
                for (let i = 0; i < additionalJobs.length; i++) {
                    updateData.additionalJobs.push({
                        details: additionalJobs[i].details,
                        partNo: additionalJobs[i].partNo,
                        quantity: additionalJobs[i].quantity,
                        labourHours: additionalJobs[i].labourHours,
                        Estimation: additionalJobs[i].Estimation,
                    })
                }
                await JobdetailsModel.findOneAndUpdate({ orderNo }, updateData, { new: true });
                let updateJobDetails = await JobdetailsModel.findOneAndUpdate({ orderNo }, updateData, { new: true })
                if (!updateJobDetails) {
                    res.status(300).json({ err: 300, msg: "Failed to update data." });
                    return;
                }
                const response = {
                    err: 200,
                    msg: "Info updated successfully",
                    data: updateJobDetails.toJSON(),
                };
                res.status(200).json(response);
            } else {
                const newJIDetailInfo = await new JobdetailsModel({
                    orderNo,
                    startDate,
                    startTime,
                    startChanges,
                    completionDate,
                    completionTime,
                    completionChanges,
                    actualStartDate,
                    actualStartTime,
                    actualStartChange,
                    jobStopStatus,
                    additionalJobsStatus,
                    actualCompletionStartDate,
                    actualCompletionStartTime,
                    actualCompletionChanges,
                    technicianName,
                    testDrive,
                    problemEliminated,
                    actualClockedHours,
                    confirmedByName,
                    waitingForServiceKey,
                    waitingForServiceStall,
                    waitingForWashingKey,
                    waitingForWashingStall,
                    jobStop: [],
                    additionalJobs: [],
                    DIST,
                    additionalJobsDate,
                    additionalJobsreschedule,
                    additionalJobslabourTotal,
                    additionalJobspartsTotal,
                    additionalJobsGrandTotal,
                    jobdetails_partReplace: [],
                    labourTotal,
                    partsTotal,
                    grandTotal
                })
                for (let i = 0; i < jobdetails_partReplace.length; i++) {
                    newJIDetailInfo.jobdetails_partReplace.push({
                        details: jobdetails_partReplace[i].details,
                        partNo: jobdetails_partReplace[i].partNo,
                        quantity: jobdetails_partReplace[i].quantity,
                        labourHours: jobdetails_partReplace[i].labourHours,
                        Estimation: jobdetails_partReplace[i].Estimation,
                    });
                }
                for (let i = 0; i < jobStop.length; i++) {
                    newJIDetailInfo.jobStop.push({
                        planStartDate: jobStop[i].planStartDate,
                        planStartTime: jobStop[i].planStartTime,
                        planRestartDate: jobStop[i].planRestartDate,
                        planRestartTime: jobStop[i].planRestartTime,
                        planChanges: jobStop[i].planChanges,
                        actualStartDate: jobStop[i].actualStartDate,
                        actualStartTime: jobStop[i].actualStartTime,
                        actualRestartDate: jobStop[i].actualRestartDate,
                        actualRestartTime: jobStop[i].actualRestartTime,
                        jobStoppageTime: jobStop[i].jobStoppageTime,
                        customerContactDate: jobStop[i].customerContactDate,
                        customerContactTime: jobStop[i].customerContactTime,
                        others: {
                            status: jobStop[i].others.status,
                            text: jobStop[i].others.text,
                        },
                        staffName: jobStop[i].staffName
                    })
                }
                for (let i = 0; i < additionalJobs.length; i++) {
                    newJIDetailInfo.additionalJobs.push({
                        details: additionalJobs[i].details,
                        partNo: additionalJobs[i].partNo,
                        quantity: additionalJobs[i].quantity,
                        labourHours: additionalJobs[i].labourHours,
                        Estimation: additionalJobs[i].Estimation,
                    })
                }
                newJIDetailInfo.save();
                const response = {
                    err: 200,
                    msg: "Info added successfully",
                    data: newJIDetailInfo.toJSON(),
                };
                res.status(200).json(response);
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}