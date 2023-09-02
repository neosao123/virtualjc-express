const express = require('express');
const fs = require('fs');
const Sample = require("../models/Sample");


exports.create = async (req, res) => {    
    var sample = new Sample();
    
    let base64image = req.body.image;
    if (base64image === "") {
    }else{
        sample.imagepath = "users/" + (Math.random() + 1).toString(36).substring(7) + ".png"
        base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");
        fs.writeFile("uploads/" + sample.imagepath, base64image, 'base64', function (err) {
        });
    }
    sample.save().then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (error) => {
        res.end(JSON.stringify({ status: "failed", data: error }));
    });
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id; // Assuming you have the sample ID in the request parameters
        const sample = await Sample.find({ id }); // Retrieve the sample from the database

        if (!sample) {
            return res.status(404).json({ status: "failed", message: "Sample not found" });
        }

        let base64image = req.body.image;
        if (base64image) {
            // If a new image is provided, update the imagepath and save the new image
            const oldImagePath = sample.imagepath;
            sample.imagepath = "users/" + (Math.random() + 1).toString(36).substring(7) + ".png";
            base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");

            fs.writeFile("uploads/" + sample.imagepath, base64image, 'base64', function (err) {
                if (err) {
                    console.error('Error saving the new image:', err);
                    return res.status(500).json({ status: "failed", message: "Error saving the new image" });
                }
                // Delete the old image
                fs.unlink("uploads/" + oldImagePath, function (err) {
                    if (err) {
                        console.error('Error deleting the old image:', err);
                    }
                    console.log('Old image deleted successfully.');
                });
            });
        }

        await sample.save();
        res.json({ status: "success", data: sample });
    } catch (error) {
        console.error('Error updating the sample:', error);
        res.status(500).json({ status: "failed", message: "Error updating the sample" });
    }
};
