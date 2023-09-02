const BasicInfo = require("../../models/BasicInfo.Model");
const DetailedInfo = require("../../models/detail.Info.Model");
const Jobdetails = require("../../models/Jobdetails.model");
const JIBasicInfoModel = require("../../models/Job Instruction Model/JIbasicInfo.Model");

// All data already saved has beeen returned here -
exports.get = async (req, res) => {
    try {
        const {
            orderNo
        } = req.body;
        let data = {};
        let BasicInfoData = await BasicInfo.findOne({ orderNo })
        let DetailedInfoData = await DetailedInfo.findOne({ orderNo });
        if (!BasicInfoData || !DetailedInfoData) {
            res.status(300).json({ err: 300, msg: "Order no does not exist" });
        } else {
            let existingInfo = await JIBasicInfoModel.findOne({ orderNo });
            if (existingInfo) {
                data = existingInfo
            } else {
                data.orderNo = BasicInfoData.orderNo
                data.waiting = BasicInfoData.waiting
                data.priority = BasicInfoData.priority
                data.PM = BasicInfoData.PM
                data.GR = BasicInfoData.GR
                data.internal = BasicInfoData.internal
                data.pickUp = BasicInfoData.pickUp
                data.appointment = BasicInfoData.appointment
                data.walkIn = BasicInfoData.walkIn
                data.receptionDate = BasicInfoData.receptionDate
                data.receptionTime = BasicInfoData.receptionTime
                data.receptionChanges = BasicInfoData.receptionChanges
                data.deliveryDate = BasicInfoData.deliveryDate
                data.deliveryTime = BasicInfoData.deliveryTime
                data.deliveryChanges = BasicInfoData.deliveryChanges
                data.RepairOrderNo = BasicInfoData.RepairOrderNo
                data.RepairOrderDate = BasicInfoData.RepairOrderDate
                data.priority = BasicInfoData.priority
                data.cname = DetailedInfoData.cname
                data.caddress = DetailedInfoData.caddress
                data.mobileTeleNumber = DetailedInfoData.mobileTeleNumber
                data.homeTeleNumber = DetailedInfoData.homeTeleNumber
                data.officeTeleNumber = DetailedInfoData.officeTeleNumber
                data.cemail = DetailedInfoData.cemail
                data.others = DetailedInfoData.others
                data.vehicleRegNo = DetailedInfoData.vehicleRegNo
                data.modelYear = DetailedInfoData.modelYear
                data.modelCode = DetailedInfoData.modelCode
                data.vinNo = DetailedInfoData.vinNo
                data.colorCode = DetailedInfoData.colorCode
            }
            res.status(200).json({ err: 200, msg: "Data fetched successfully", data: data });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            orderNo,
            priority,
            waiting,
            PM,
            GR,
            KM,
            WR,
            internal,
            pickUp,
            appointment,
            walkIn,
            receptionDate,
            receptionTime,
            receptionChanges,
            deliveryDate,
            deliveryTime,
            deliveryChanges,
            RepairOrderNo,
            RepairDate,
            cname,
            caddress,
            mobileTeleNumber,
            homeTeleNumber,
            officeTeleNumber,
            cemail,
            others,
            vehicleRegNo,
            modelYear,
            modelCode,
            vinNo,
            colorCode
        } = req.body;
        let existingOrderNo = await BasicInfo.findOne({ orderNo });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Order number does not exist." });
        } else {
            let existingInfo = await JIBasicInfoModel.findOne({ orderNo });
            if (existingInfo) {
                const updateData = {
                    priority,
                    waiting,
                    PM,
                    GR,
                    KM,
                    WR,
                    internal,
                    pickUp: {
                        status: pickUp.status,
                        text: pickUp.text
                    },
                    appointment,
                    walkIn,
                    receptionDate,
                    receptionTime,
                    receptionChanges,
                    deliveryDate,
                    deliveryTime,
                    deliveryChanges,
                    RepairOrderNo,
                    RepairDate,
                    cname,
                    caddress,
                    mobileTeleNumber: {
                        "status": mobileTeleNumber.status,
                        "text": mobileTeleNumber.text
                    },
                    homeTeleNumber: {
                        "status": homeTeleNumber.status,
                        "text": homeTeleNumber.text
                    },
                    officeTeleNumber: {
                        "status": officeTeleNumber.status,
                        "text": officeTeleNumber.text
                    },
                    cemail: {
                        "status": cemail.status,
                        "text": cemail.text
                    },
                    others: {
                        "status": others.status,
                        "text": others.text
                    },
                    vehicleRegNo,
                    modelYear,
                    modelCode,
                    vinNo,
                    colorCode
                }
                const updateBasicInfo = await BasicInfo.findOneAndUpdate({ orderNo }, updateData, { new: true });
                const updateDetailedInfo = await DetailedInfo.findOneAndUpdate({ orderNo }, updateData, { new: true });
                const updatedInfo = await JIBasicInfoModel.findOneAndUpdate({ orderNo }, updateData, { new: true });
                if (!updatedInfo) {
                    res.status(300).json({ err: 300, msg: "Failed to update data." });
                    return;
                }
                const response = {
                    err: 200,
                    msg: "Info updated successfully",
                    data: updatedInfo.toJSON(),
                };
                res.status(200).json(response);
            } else {
                const newJIBasicInfo = await new JIBasicInfoModel({
                    orderNo,
                    priority,
                    waiting,
                    PM,
                    GR,
                    KM,
                    WR,
                    internal,
                    pickUp: {
                        status: pickUp.status,
                        text: pickUp.text
                    },
                    appointment,
                    walkIn,
                    receptionDate,
                    receptionTime,
                    receptionChanges,
                    deliveryDate,
                    deliveryTime,
                    deliveryChanges,
                    RepairOrderNo,
                    RepairDate,
                    cname,
                    caddress,
                    mobileTeleNumber: {
                        status: mobileTeleNumber.status,
                        text: mobileTeleNumber.text
                    },
                    homeTeleNumber: {
                        status: homeTeleNumber.status,
                        text: homeTeleNumber.text
                    },
                    officeTeleNumber: {
                        status: officeTeleNumber.status,
                        text: officeTeleNumber.text
                    },
                    cemail: {
                        status: cemail.status,
                        text: cemail.text
                    },
                    others: {
                        status: others.status,
                        text: others.text
                    },
                    vehicleRegNo,
                    modelYear,
                    modelCode,
                    vinNo,
                    colorCode
                }).save();
                let updateData = {
                    priority,
                    waiting,
                    PM,
                    GR,
                    internal,
                    pickUp,
                    appointment,
                    walkIn,
                    receptionDate,
                    receptionTime,
                    receptionChanges,
                    deliveryDate,
                    deliveryTime,
                    deliveryChanges,
                    RepairOrderNo,
                    RepairDate,
                    cname,
                    caddress,
                    mobileTeleNumber: {
                        status: mobileTeleNumber.status,
                        text: mobileTeleNumber.text
                    },
                    homeTeleNumber: {
                        status: homeTeleNumber.status,
                        text: homeTeleNumber.text
                    },
                    officeTeleNumber: {
                        status: officeTeleNumber.status,
                        text: officeTeleNumber.text
                    },
                    cemail: {
                        status: cemail.status,
                        text: cemail.text
                    },
                    others: {
                        status: others.status,
                        text: others.text
                    },
                    vehicleRegNo,
                    modelYear,
                    modelCode,
                    vinNo,
                    colorCode
                }
                const updateBasicInfo = await BasicInfo.findOneAndUpdate({ orderNo }, updateData, { new: true });
                const updateDetailedInfo = await DetailedInfo.findOneAndUpdate({ orderNo }, updateData, { new: true });
                const response = {
                    err: 200,
                    msg: "Info added successfully",
                    data: newJIBasicInfo.toJSON(),
                };
                res.status(200).json(response);
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}
