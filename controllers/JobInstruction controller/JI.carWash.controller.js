const JICarWashModel = require("../../models/Job Instruction Model/JI.CarWash.Model.js");
const basicModel = require("../../models/BasicInfo.Model");

exports.get = async (req, res) => {
    try {
        const {
            orderNo
        } = req.body;
        let BasicInfoData = await basicModel.findOne({ orderNo });
        if (!BasicInfoData) {
            res.status(300).json({ err: 300, msg: "Order no does not exist" });
        } else {
            let JICarWashData = await JICarWashModel.findOne({ orderNo });
            if (JICarWashData) {
                res.status(200).json({ err: 200, msg: "Data Found", data: JICarWashData });
            } else {
                res.status(300).json({ err: 300, msg: "No Data Found" });
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            orderNo,
            planDate,
            planTime,
            actualDate,
            actualTime,
            staffName
        } = req.body;

        let existingOrderNo = await basicModel.findOne({ orderNo });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Order number does not exist." });
        } else {
            let existingCarWash = await JICarWashModel.findOne({ orderNo });
            if (existingCarWash) {
                const updateData = {
                    planDate,
                    planTime,
                    actualDate,
                    actualTime,
                    staffName
                }
                let updateCarWash = await JICarWashModel.findOneAndUpdate({ orderNo }, updateData, { new: true });
                if (!updateCarWash) {
                    res.status(300).json({ err: 300, msg: "Failed to update data" })
                }
                const response = {
                    err: 200,
                    msg: "Info updated successfully",
                    data: updateCarWash.toJSON(),
                };
                res.status(200).json(response);
            } else {
                const newCarWash = new JICarWashModel({
                    orderNo,
                    planDate,
                    planTime,
                    actualDate,
                    actualTime,
                    staffName
                });
                newCarWash.save().then((result) => {
                    res.status(200).json({ err: 200, msg: "Info added successfully", data: result });
                })
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}