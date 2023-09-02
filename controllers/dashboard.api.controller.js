const basicInfoModel = require("../models/BasicInfo.Model");
const jobDetailsModel = require("../models/Jobdetails.model");
const detailInfoModel = require("../models/detail.Info.Model");

exports.count = async (req, res) => {
    try {
        let date = new Date();
        let fullYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`
        } else {
            day = day
        }
        if (month < 10) {
            month = `0${month}`
        } else {
            month = month
        }
        let fulldate = `${day}/${month}/${fullYear}`;

        let totalOrders = await basicInfoModel.find({
            basicInfoStep: true, detailInfoStep: true, customweRequestStep: true, jobDetailsStep: true, otherDetailsStep: true
        });

        let todaysJobOrder = await basicInfoModel.find({ receptionDate: fulldate, basicInfoStep: true, detailInfoStep: true, customweRequestStep: true, jobDetailsStep: true, otherDetailsStep: true });
        let Completed = await basicInfoModel.find({ status: "Completed" });
        let inProgress = await basicInfoModel.find({ status: "inProgress", basicInfoStep: true, detailInfoStep: true, customweRequestStep: true, jobDetailsStep: true, otherDetailsStep: true });
        res.status(200).json({ err: 200, msg: "Data fetched success", totalOrders: totalOrders.length, todaysJobOrder: todaysJobOrder.length, Completed: Completed.length, inProgress: inProgress.length });

    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}

exports.todaysCustomerOrders = async (req, res) => {
    try {
        let date = new Date();
        let fullYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`
        } else {
            day = day
        }
        if (month < 10) {
            month = `0${month}`
        } else {
            month = month
        }
        let fulldate = `${day}/${month}/${fullYear}`;
        let todaysJobOrder = await basicInfoModel.find({ receptionDate: fulldate });
        console.log(todaysJobOrder.length);
        if (todaysJobOrder.length === 0) {
            res.status(300).json({ err: 300, msg: "Data not found" });
        } else {
            res.status(200).json({ err: 200, msg: "Data found", todaysOrders: todaysJobOrder.length, data: todaysJobOrder });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.totalCustomerOrders = async (req, res) => {
    try {
        let JobCards = await basicInfoModel.find({ basicInfoStep: true, detailInfoStep: true, customweRequestStep: true, jobDetailsStep: true, otherDetailsStep: true }).sort({ createdAt: -1 })
        let orderNo = [];
        JobCards.map((data) => {
            orderNo.push({ orderNo: data.orderNo })
        });
        let Result = [];
        await Promise.all(orderNo.map(async (data) => {
            let result = await detailInfoModel.findOne({ orderNo: data.orderNo });
            Result.push(result);
        }));
        let finalResult = Result.filter(result => result !== null)

        if (finalResult.length === 0) {
            res.status(300).json({ err: 300, msg: "Data not found" });
        } else {
            res.status(200).json({ err: 200, msg: "Data found", totalCustomerOrders: finalResult.length, data: finalResult });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.searchJobCards = async (req, res) => {
    try {
        const { params } = req.params;
        let jobCards = await basicInfoModel.find({ title: params });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}


exports.getJobInstructionList = async (req, res) => {
    try {
        const { orderNo } = req.body;
        let data = {};       

    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}