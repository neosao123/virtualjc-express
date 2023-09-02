const JIPostServiceFollowUpModel = require("../../models/Job Instruction Model/JI.postServiceFollowUp.Model.js");
const BasicInfo = require("../../models/Job Instruction Model/JIbasicInfo.Model");

exports.get = async (req, res) => {
    try {
        const { orderNo } = req.body;
        let BasicInfoData = await BasicInfo.findOne({ orderNo });
        if (!BasicInfoData) {
            res.status(300).json({ err: 300, msg: "Order no does not exist" });
        } else {
            let JIPostServiceData = await JIPostServiceFollowUpModel.findOne({ orderNo });
            if (JIPostServiceData) {
                res.status(200).json({ err: 200, msg: "Data Found", data: JIPostServiceData });
            } else {
                res.status(300).json({ err: 300, msg: "No Data Found" });
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: err.toString() });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            orderNo,
            planDate,
            planTime,
            contactInfo,
            actualDate,
            actualTime,
            result,
            staffName,
            confimedBy,
            customerPreferences,
        } = req.body;

        let existingOrderNo = await BasicInfo.findOne({ orderNo });

        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Order number does not exist." });
        } else {
            let existingInfo = await JIPostServiceFollowUpModel.findOne({ orderNo });
            if (existingInfo) {
                const updateData = {
                    planDate,
                    planTime,
                    contactInfo: [],
                    actualDate,
                    actualTime,
                    result: [],
                    staffName,
                    confimedBy,
                    customerPreferences,
                }
                for (let i = 0; i < contactInfo.length; i++) {
                    updateData.contactInfo.push({
                        name: contactInfo[i].name,
                        status: contactInfo[i].status,
                        text: contactInfo[i].text,
                    });
                }
                for (let i = 0; i < result.length; i++) {
                    updateData.result.push({
                        name: result[i].name,
                        status: result[i].status,
                        text: result[i].text,
                    });
                }
                let updateFollowUpData = await JIPostServiceFollowUpModel.findOneAndUpdate({ orderNo }, updateData, { new: true })
                if (!updateFollowUpData) {
                    res.status(300).json({ err: 300, msg: "Failed to update data." });
                    return;
                }
                const response = {
                    err: 200,
                    msg: "Info updated successfully",
                    data: updateFollowUpData.toJSON(),
                };
                res.status(200).json(response);
            } else {
                const newFollowUpData = await new JIPostServiceFollowUpModel({
                    orderNo,
                    planDate,
                    planTime,
                    contactInfo: [],
                    actualDate,
                    actualTime,
                    result: [],
                    staffName,
                    confimedBy,
                    customerPreferences,
                });
                for (let i = 0; i < contactInfo.length; i++) {
                    newFollowUpData.contactInfo.push({
                        text: contactInfo[i].text,
                        status: contactInfo[i].status,
                    });
                }
                for (let i = 0; i < result.length; i++) {
                    newFollowUpData.result.push({
                        text: result[i].text,
                        status: result[i].status,
                    });
                }
                newFollowUpData.save();
                const response = {
                    err: 200,
                    msg: "Info added successfully",
                    data: newFollowUpData.toJSON(),
                };
                res.status(200).json(response);
            }
        }

    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}