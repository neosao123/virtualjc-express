const customerRequestModel = require("../models/Customer.request.Model");
const BasicInfo = require("../models/BasicInfo.Model");

exports.create = async (req, res) => {
    try {
        const {
            orderNo,
            customerRequest,
            requestForTA,
            requestDate,
            requestTime,
            appointment,
            appointmentDate,
            appointmentTime,
            diagnosticQuestionnaire,
            staffName,
        } = req.body;

        let existingOrderNo = await BasicInfo.findOne({ orderNo, detailInfoStep: true });
        if (existingOrderNo === null) {
            res.status(300).json({ err: 300, msg: "Please complete Detailed Info." });
        } else {
            let existingCustomerRequest = await customerRequestModel.findOne({ orderNo });
            if (existingCustomerRequest) {
                // If customer exists, update the data
                const updatedData = {
                    customerRequest,
                    requestForTA,
                    requestDate,
                    requestTime,
                    appointment,
                    appointmentDate,
                    appointmentTime,
                    diagnosticQuestionnaire,
                    staffName,
                };
                const updatedCustomerRequest = await customerRequestModel.findOneAndUpdate({ orderNo }, updatedData, { new: true });
                if (!updatedCustomerRequest) {
                    res.status(300).json({ err: 300, msg: "Failed to update customer data." });
                    return;
                }
                const response = {
                    err: 200,
                    msg: "Customer updated successfully",
                    data: updatedCustomerRequest.toJSON(),
                };
                await BasicInfo.findOneAndUpdate({ orderNo }, { customweRequestStep: true }, { new: true });
                res.status(200).json(response);

            } else {
                const newCustomerRequest = await new customerRequestModel({
                    orderNo,
                    customerRequest,
                    requestForTA,
                    requestDate,
                    requestTime,
                    appointment,
                    appointmentDate,
                    appointmentTime,
                    diagnosticQuestionnaire,
                    staffName,
                }).save();
                await BasicInfo.findOneAndUpdate({ orderNo }, { customweRequestStep: true }, { new: true });
                const response = {
                    err: 200,
                    msg: "Customer added successfully",
                    data: newCustomerRequest.toJSON(),
                };
                res.status(200).json(response);
            }
        }

    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}
