const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config/config');
const mongoose = require("mongoose");
const fs = require('fs');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, phoneNumber } = req.body;
        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (userExists) return res.status(300).json({ err: 300, msg: 'User already exists' });
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // validation 
        if (!/^[a-zA-Z]+$/.test(firstName)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid first name" })
        }
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid last name" })
        }
        if (phoneNumber === undefined) {
            return res.status(300).json({ err: 300, msg: "Phone number required" })
        }
        if (!/^\d+$/.test(phoneNumber)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid phone number" });
        } if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid email" });
        }
        if (email === undefined || email === "") {
            return res.status(300).json({ err: 300, msg: "Please enter email" });
        }
        if (password === undefined || password === "") {
            return res.status(300).json({ err: 300, msg: "Please enter password" });
        }
        const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,}$/
        if (!passregex.test(password)) {
            return res.status(300).json({ err: 300, msg: "Please enter valid password" });
        }
        // if (role !== "supervisor" && role !== "serviceadvisor") {
        //     return res.status(300).json({ err: 300, msg: "Only allowed roles are supervisor and serviceadvisor" })
        // }
        // Create user
        const user = new User({
            IP: req.connection.remoteAddress,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            phoneNumber
        });
        await user.save();
        // Generate JWT
        const token = jwt.sign({ _id: user._id }, config.SECRETE_KEY, { expiresIn: '24d' });
        res.status(200).json({ err: 200, msg: `User registered successfully`, data: user, token });
    } catch (err) {
        res.status(500).json({ msg: err.toString() });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ err: 400, msg: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, config.SECRETE_KEY, { expiresIn: '24d' });
    res.status(200).json({ err: 200, msg: "Logged in successfully", data: user, token });
};

exports.getSuperviser = async (req, res) => {
    try {
        let supervisorList = await User.find({ role: "supervisor" });
        if (!supervisorList) {
            res.status(300).json({ err: 300, msg: "Supervisor not found" });
        }
        // let supervisorsWithCount = await Promise.all(
        //     supervisorList.map(async (supervisor) => {

        //         const serviceAdvisors = await User.find({
        //             higherAutherity: supervisor._id,
        //             role: "serviceadvisor",
        //         });
        //         return {
        //             _id: supervisor._id,
        //             firstName: supervisor.firstName,
        //             lastName: supervisor.lastName,
        //             email: supervisor.email,
        //             profile: supervisor.profile,
        //             count: serviceAdvisors.length,
        //             serviceAdvisors,
        //         };
        //     })
        // );
        res.status(200).json({ err: 200, msg: "Data found", data: supervisorList });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
};

exports.add = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            role,
            email,
            password,
            IP,
            profile,
            higherAutherity
        } = req.body;
        let date = new Date();
        let time = date.getFullYear() + date.getMonth() + date.getDay() + date.getTime()
        let base64image = req.body.profile;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(300).json({ error: { code: 300, message: "User already exists" } });
            return;
        }

        switch (role) {

            case 'supervisor':
                newUser = new User({
                    firstName,
                    lastName,
                    phoneNumber,
                    role,
                    email,
                    password,
                    IP
                });
                if (base64image != "") {
                    newUser.profilePath = "users/" + "image-" + time + ".png"
                    base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");
                    fs.writeFile("uploads/" + newUser.profilePath, base64image, 'base64', function (err) {
                    });
                }

                try {
                    let result = await newUser.save();
                    res.status(200).json({ err: 200, msg: "User created successfully", data: result })
                } catch (error) {
                    res.status(500).json({ error: { code: 500, message: error.message } });
                }
                break;
            case 'serviceadvisor':
                newUser = new User({
                    firstName,
                    lastName,
                    phoneNumber,
                    role,
                    email,
                    password,
                    IP,
                    higherAutherity: new mongoose.Types.ObjectId(higherAutherity)
                });
                if (base64image != "") {
                    newUser.profilePath = "users/" + "image-" + time + ".png"
                    base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");
                    fs.writeFile("uploads/" + newUser.profilePath, base64image, 'base64', function (err) {
                    });
                }

                try {
                    let result = await newUser.save();
                    res.status(200).json({ err: 200, msg: "User created successfully", data: result });
                } catch (error) {
                    res.status(500).json({ error: { code: 500, message: error.message } });
                }
                break;
            default:

                res.status(400).json({ error: { code: 400, message: "Invalid role" } });
                break;
        }
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: error.message } });
    }
}

exports.update = async (req, res) => {
    try {

        const {
            _id,
            firstName,
            lastName,
            phoneNumber,
            role,
            email,            
            IP,            
            higherAutherity
        } = req.body;
        let date = new Date();
        let time = date.getFullYear() + date.getMonth() + date.getDay() + date.getTime()
        let base64image = req.body.profile;

        let existingUser = await User.findOne({ _id });
        if (!existingUser) {
            res.status(300).json({ err: 300, msg: "User Not Found" });
        } else {
            switch (role) {
                case 'supervisor':
                    let updateData = {
                        firstName,
                        lastName,
                        phoneNumber,
                        role,
                        email,
                        IP,
                    };
                    if (base64image != "") {
                        updateData.profilePath = "users/" + "image-" + time + ".png"
                        base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");
                        console.log(base64image);
                        fs.writeFile("uploads/" + updateData.profilePath, base64image, 'base64', function (err) {
                        });
                    }
                    let updateSupervisor = await User.findOneAndUpdate({ _id }, updateData, { new: true });
                    if (!updateSupervisor) {
                        res.status(300).json({ err: 300, msg: "Failed to update" })
                    }
                    res.status(200).json({ err: 200, msg: "User updated successfully", data: updateSupervisor });
                    break;
                case 'serviceadvisor':
                    let update = {
                        firstName,
                        lastName,
                        phoneNumber,
                        role,
                        email,
                        IP,
                        higherAutherity: typeof higherAutherity !== 'undefined' ? new mongoose.Types.ObjectId(higherAutherity) : undefined,
                    };

                    if (base64image != "") {
                        update.profilePath = "users/" + "image-" + time + ".png"
                        base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");
                        fs.writeFile("uploads/" + update.profilePath, base64image, 'base64', function (err) {
                        });
                    }
                    let updateServiceAdvisor = await User.findOneAndUpdate({ _id }, update, { new: true });
                    if (!updateServiceAdvisor) {
                        res.status(300).json({ err: 300, msg: "Failed to update data" })
                    }
                    res.status(200).json({ err: 200, msg: "User updated successfully", data: updateServiceAdvisor });

                    break;
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.delete = async (req, res) => {
    try {
        const {
            _id,
        } = req.body;

        let foundUser = await User.findOne({ _id });
        if (!foundUser) {
            return res.status(300).json({ err: 300, msg: "User Not Found" })
        }
        switch (foundUser.role) {
            case 'supervisor':
                let assignedSupervisor = await User.findOne({ higherAutherity: _id })
                if (!assignedSupervisor) {
                    let deleteSupervisor = await User.findOneAndDelete({ _id });
                    if (!deleteSupervisor) {
                        return res.status(300).json({ err: 300, msg: "Failed to delete user" })
                    }
                    return res.status(200).json({ err: 200, msg: "User deleted successfully" });
                } else {
                    return res.status(300).json({ err: 300, msg: "Supervisor already assigned can not delete this user" });
                }
                break;

            case 'serviceadvisor':
                let DeleteServiceAdvisor = await User.findOneAndDelete({ _id });
                if (!DeleteServiceAdvisor) {
                    return res.status(300).json({ err: 300, msg: "Failed to delete service advisor" })
                }
                return res.status(200).json({ err: 200, msg: "User Deleted successfully" })
                break
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.listUsers = async (req, res) => {
    try {
        const {
            role
        } = req.body;

        let users = await User.find({ role: { $in: ['serviceadvisor', 'supervisor'] } });
        if (!users) {
            res.status(300).json({ err: 300, msg: "No user found" });
        }
        res.status(200).json({ err: 200, msg: "data found", data: users })


    } catch (error) {
        res.status(200).json({ err: 200, msg: error.toString() })
    }
}

// admin can reset password of supervisor and serviceadvisor - 
exports.AdminSideresetPassword = async (req, res) => {
    try {
        const { _id } = req.body;

        let existingUser = await User.findOne({ _id });
        if (existingUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("123456", salt);
            let updatePass = {
                password: hashedPassword
            }
            let updatedUser = await User.findOneAndUpdate({ _id }, updatePass, { new: true });
            if (!updatedUser) {
                res.status(300).json({ err: "Failed to reset password" });
            }
            res.status(200).json({ err: 200, msg: "Password reset successfully", data: updatedUser });
        }
    } catch (error) {
        res.status(200).json({ err: 200, msg: error.toString() })
    }
}

// User can reset password of themselves - 
exports.UserResetPassword = async (req, res) => {
    try {
        const {
            _id,
            password,
            newPassword
        } = req.body;

        let userExists = await User.findOne({ _id });
        if (!userExists) {
            res.status(300).json({ err: 300, msg: "User does not exist" });
        } else {
            const isMatch = await bcrypt.compare(password, userExists.password);
            if (!isMatch) {
                return res.status(300).json({ msg: 'Invalid password' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            let updatePass = await User.findOneAndUpdate({ _id }, { password: hashedPassword }, { new: true });
            if (!updatePass) {
                res.status(300).json({ err: 300, msg: "Failed to update password" });
            }
            res.status(200).json({ err: 200, msg: "Password updated successfully", data: updatePass });
        }

    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() });
    }
}
