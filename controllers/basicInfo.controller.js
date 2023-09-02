const { default: mongoose } = require("mongoose");
const BasicInfo = require("../models/BasicInfo.Model");

const { v4: uuidv4 } = require('uuid');


exports.createorupdate = async (req, res) => {
    try {
        const {
            id, waiting, KM, PM, GR, WR, internal, pickUp, appointment, walkIn, receptionDate, receptionTime, receptionChanges, deliveryDate, deliveryTime, deliveryChanges, RepairOrderNo, RepairOrderDate, serviceInvitation, serviceInvitationDate, BOparts, BOpartsStaffName, appointmentConfirmation, appointmentConfirmationStaffName, partsOrdered, partsOrderedStaffName, partsConfirmed, partsConfirmedStaffName, orderNo
        } = req.body;
        let orderNum;
        let existingOrderNo = await BasicInfo.findOne().sort({ orderNo: -1 });
        if (existingOrderNo) {
            const lastOrderNo = existingOrderNo.orderNo;
            orderNum = Number(lastOrderNo) + 1
        } else {
            orderNum = 3000;
        }
        let existingBasicInfo = await BasicInfo.findOne({ orderNo });
        if (existingBasicInfo) {
            let updateBasicInfo = await BasicInfo.findOneAndUpdate(orderNo, {
                waiting, KM, PM, GR, WR, internal,
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
                RepairOrderDate,
                serviceInvitation,
                serviceInvitationDate,
                BOparts,
                BOpartsStaffName,
                appointmentConfirmation,
                appointmentConfirmationStaffName,
                partsOrdered,
                partsOrderedStaffName,
                partsConfirmed,
                partsConfirmedStaffName,
                orderNo,
                basicInfoStep: true
            }, { new: true });
            res.status(200).json({ err: 200, msg: "Data updated successfully", data: updateBasicInfo })
        } else {
            let newBasicInfo = new BasicInfo(
                {
                    waiting,
                    KM,
                    PM,
                    GR,
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
                    RepairOrderDate,
                    serviceInvitation,
                    serviceInvitationDate,
                    BOparts,
                    BOpartsStaffName,
                    appointmentConfirmation,
                    appointmentConfirmationStaffName,
                    partsOrdered,
                    partsOrderedStaffName,
                    partsConfirmed,
                    partsConfirmedStaffName,
                    orderNo: orderNum,
                    basicInfoStep: true
                }
            )
            let newInfo = newBasicInfo.save().then((result) => {
                res.status(200).json({ err: 200, orderNo: orderNum, msg: "Basic Information added successfully", data: result });
            });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

