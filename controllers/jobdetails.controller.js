const jobDetailsModel = require("../models/Jobdetails.model");
const BasicInfo = require("../models/BasicInfo.Model");
exports.create = async (req, res) => {
    try {
        const {
            orderNo,
            jobdetails_partReplace,
            labourTotal,
            partsTotal,
            grandTotal, 
        } = req.body

        let existingOrderNo = await BasicInfo.findOne({ orderNo, customweRequestStep: true });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Please complete Customer Request form" });
        } else {
            let existingJobDetails = await jobDetailsModel.findOne({ orderNo });
            if (existingJobDetails) {
                let updateData = {
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

                const jobDetailInfo = await jobDetailsModel.findOneAndUpdate({ orderNo }, updateData, { new: true });
                if (!jobDetailInfo) {
                    res.status(300).json({ err: 300, msg: "Failed to update data." });
                    return;
                }
                await BasicInfo.findOneAndUpdate({ orderNo }, { jobDetailsStep: true }, { new: true })
                res.status(200).json({ err: 200, msg: "Info updated successfully", data: jobDetailInfo });
            } else {
                const jobdetails_partReplace = req.body.jobdetails_partReplace;
                const newJobDetails = new jobDetailsModel({
                    orderNo,
                    jobdetails_partReplace: [],
                    labourTotal,
                    partsTotal,
                    grandTotal,
                });
                for (let i = 0; i < jobdetails_partReplace.length; i++) {
                    newJobDetails.jobdetails_partReplace.push({
                        details: jobdetails_partReplace[i].details,
                        partNo: jobdetails_partReplace[i].partNo,
                        quantity: jobdetails_partReplace[i].quantity,
                        labourHours: jobdetails_partReplace[i].labourHours,
                        Estimation: jobdetails_partReplace[i].Estimation,
                        // results: {
                        //     status: jobdetails_partReplace[i].results[i].status,
                        //     text: jobdetails_partReplace[i].results[i].text
                        // }
                    });
                } 
                newJobDetails.save().then(async (result) => {
                    res.status(200).json({ err: 200, msg: "Info added successfully", data: result });
                    await BasicInfo.findOneAndUpdate({ orderNo }, { jobDetailsStep: true }, { new: true })
                });
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}