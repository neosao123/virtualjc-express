const BasicInfoModel = require("../models/BasicInfo.Model");
const DetailedInfoModel = require("../models/detail.Info.Model");
const fs = require("fs");

exports.create = async (req, res) => {
    try {

        const {
            orderNo,
            // customerInfo
            cname,
            caddress,
            mobileTeleNumber,
            homeTeleNumber,
            officeTeleNumber,
            cemail,
            drivenBy,
            others,
            availableDate,
            availableTime,
            // vehicleInfo
            vehicleRegNo,
            modelYear,
            modelCode,
            vinNo,
            colorCode,
            saleDate,
            sscScInfo,
            egNumber,
            dlrNo,
            opNo,
            completedOpNo,
            // previousServiceInfo
            jobType,
            RoNo,
            OdoRead,
            Payment,
            RecDate,
            RecTime,
            DelDate,
            DelTime,
            carWash,
            replacedParts,
            SA,
            tech,
            techAdvice
        } = req.body;

        let base64img_vehicle = req.body.img_vehicle;

        let existingOrderNo = await BasicInfoModel.findOne({ orderNo, basicInfoStep: true });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Please complete Basic Info." });
        } else {
            let existingDetailedInfo = await DetailedInfoModel.findOne({ orderNo });
            if (existingDetailedInfo) {
                const updatedData = {
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
                    drivenBy: {
                        name: drivenBy.name,
                        status: drivenBy.status,
                        text: drivenBy.text                      
                    },
                    others: {
                        status: others.status,
                        text: others.text
                    },
                    availableDate,
                    availableTime,
                    vehicleRegNo,
                    modelYear,
                    modelCode,
                    vinNo,
                    colorCode,
                    saleDate,
                    sscScInfo,
                    egNumber,
                    dlrNo,
                    opNo,
                    completedOpNo,
                    jobType,
                    RoNo,
                    OdoRead,
                    Payment,
                    RecDate,
                    RecTime,
                    DelDate,
                    DelTime,
                    carWash,
                    replacedParts,
                    SA,
                    tech,
                    techAdvice
                };

                if (base64img_vehicle != "") {
                    updatedData.img_vehiclePath = "otherdetails/" + (Math.random() + 1).toString(36).substring(7) + ".png"
                    base64img_vehicle = base64img_vehicle.replace(/^data:image\/[a-z]*;base64,/, "");
                    fs.writeFile("uploads/" + updatedData.img_vehiclePath, base64img_vehicle, 'base64', function (err) {
                    });
                }

                const updatedDetailedInfo = await DetailedInfoModel.findOneAndUpdate({ orderNo }, updatedData, { new: true });
                if (!updatedDetailedInfo) {
                    res.status(300).json({ err: 300, msg: "Failed to update data." });
                    return;
                }
                const response = {
                    err: 200,
                    msg: "Info updated successfully",
                    data: updatedDetailedInfo.toJSON(),
                };
                await BasicInfoModel.findOneAndUpdate({ orderNo }, { detailInfoStep: true }, { new: true });
                res.status(200).json(response);
            } else {
                const newDetailedInfo = await new DetailedInfoModel({
                    orderNo,
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
                    drivenBy: {
                        name: drivenBy.name,
                        status: drivenBy.status,
                        text: drivenBy.text
                    },
                    others: {
                        status: others.status,
                        text: others.text
                    },
                    availableDate,
                    availableTime,
                    vehicleRegNo,
                    modelYear,
                    modelCode,
                    vinNo,
                    colorCode,
                    saleDate,
                    sscScInfo,
                    egNumber,
                    dlrNo,
                    opNo,
                    completedOpNo,
                    jobType,
                    RoNo,
                    OdoRead,
                    Payment,
                    RecDate,
                    RecTime,
                    DelDate,
                    DelTime,
                    carWash,
                    replacedParts,
                    SA,
                    tech,
                    techAdvice
                })
                if (base64img_vehicle != "") {
                    newDetailedInfo.img_vehiclePath = "otherdetails/" + (Math.random() + 1).toString(36).substring(7) + ".png"
                    base64img_vehicle = base64img_vehicle.replace(/^data:image\/[a-z]*;base64,/, "");
                    fs.writeFile("uploads/" + newDetailedInfo.img_vehiclePath, base64img_vehicle, 'base64', function (err) {
                    });
                }
                let saveData = await newDetailedInfo.save();
                await BasicInfoModel.findOneAndUpdate({ orderNo }, { detailInfoStep: true }, { new: true });
                const response = {
                    err: 200,
                    msg: "Info added successfully",
                    data: saveData,
                };
                res.status(200).json(response);
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}