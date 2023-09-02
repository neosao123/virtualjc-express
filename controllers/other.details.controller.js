const otherDetailsModel = require("../models/other.details.Model");
const BasicInfo = require("../models/BasicInfo.Model");
const fs = require("fs");

exports.create = async (req, res) => {
  try {
    let {
      orderNo,
      tools,
      cigLighter,
      spareWheel,
      radioCassete,
      lightCondition,
      fireExtinguisher,
      damageDent,
      noOfKeys,
      instrumentCluster,
      inspectedBy,
      fuelLevel,
      odometerReading,
      signature_InspectedBy,
      good,
      noGood,
      nonGenuine,
      notFixed,
      doubleMat,
      noGoodOthers,
      cash,
      creditCard,
      cheque,
      payMethodOthers,
      replacedParts,
      carWash,
      valuable,
      protectiveCoversSeat,
      protectiveCoversFloor,
      receptionDate,
      receptionTime,
      accessoriesInstallation,
      staffName,
      memoText,
      front,
      frontRight,
      frontLeft,
      sideRight,
      sideLeft,
      rearRight,
      rearLeft,
      rear,
    } = req.body;

    let base64img_tools = req.body.img_tools;
    let base64img_cigLighter = req.body.img_cigLighter;
    let base64img_spareWheel = req.body.img_spareWheel;
    let base64img_radioCassete = req.body.img_radioCassete;
    let base64img_lightCondition = req.body.img_lightCondition;
    let base64img_fireExtinguisher = req.body.img_fireExtinguisher;
    let base64img_damageDent = req.body.img_damageDent;
    let base64img_noOfKeys = req.body.img_noOfKeys;
    let base64img_instrumentCluster = req.body.img_instrumentCluster;
    let base64customerSignature = req.body.customerSignature;

    let base64img_front = req.body.img_front;
    let base64img_frontRight = req.body.img_frontRight;
    let base64img_frontLeft = req.body.img_frontLeft;
    let base64img_sideRight = req.body.img_sideRight;
    let base64img_sideLeft = req.body.img_sideLeft;
    let base64img_rearRight = req.body.img_rearRight;
    let base64img_rearLeft = req.body.img_rearLeft;
    let base64img_rear = req.body.img_rear;

    let existingOrderNo = await BasicInfo.findOne({
      orderNo,
      jobDetailsStep: true,
    });
    if (existingOrderNo === null) {
      res.status(300).json({ err: 300, msg: "Please fill Job Details Step" });
    } else {
      let existingotherDeatails = await otherDetailsModel.findOne({ orderNo });
      if (existingotherDeatails) {
        let updateData = {
          tools,
          cigLighter,
          spareWheel,
          radioCassete,
          lightCondition,
          fireExtinguisher,
          damageDent,
          noOfKeys,
          instrumentCluster,
          inspectedBy,
          fuelLevel,
          odometerReading,
          good,
          noGood,
          nonGenuine,
          notFixed,
          doubleMat,
          noGoodOthers: {
            status: noGoodOthers.status,
            text: noGoodOthers.text,
          },
          cash,
          creditCard,
          cheque,
          payMethodOthers: {
            status: payMethodOthers.status,
            text: payMethodOthers.text,
          },
          replacedParts,
          carWash,
          valuable,
          protectiveCoversSeat,
          protectiveCoversFloor,
          receptionDate,
          receptionTime,
          accessoriesInstallation,
          staffName,
          memoText,
          front,
          frontRight,
          frontLeft,
          sideRight,
          sideLeft,
          rearRight,
          rearLeft,
          rear,
        };
        console.log("updateData", updateData);
        if (updateData.img_toolsPath) {
          if (base64img_tools.length > 0) {
            updateData.img_toolsPath =
              "otherdetails/" +
              "imagetools-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_tools = base64img_tools.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_toolsPath,
              base64img_tools,
              "base64",
              function (err) {}
            );
          }
        }
        if (updateData.img_cigLighterPath) {
          if (base64img_cigLighter != "") {
            updateData.img_cigLighterPath =
              "otherdetails/" +
              "imagecig-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_cigLighter = base64img_cigLighter.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_cigLighterPath,
              base64img_cigLighter,
              "base64",
              function (err) {}
            );
          }
        }
        if (updateData.img_spareWeelPath) {
          if (base64img_spareWheel != "") {
            updateData.img_spareWeelPath =
              "otherdetails/" +
              "imagespwh-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_spareWheel = base64img_spareWheel.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_spareWeelPath,
              base64img_spareWheel,
              "base64",
              function (err) {}
            );
          }
        }
        if (updateData.img_radioCassetePath) {
          if (base64img_radioCassete != "") {
            updateData.img_radioCassetePath =
              "otherdetails/" +
              "imagerdcs-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_radioCassete = base64img_radioCassete.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_radioCassetePath,
              base64img_radioCassete,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_lightConditionPath) {
          if (base64img_lightCondition != "") {
            updateData.img_lightConditionPath =
              "otherdetails/" +
              "imagelig-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_lightCondition = base64img_lightCondition.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_lightConditionPath,
              base64img_lightCondition,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_fireExtinguisherPath) {
          if (base64img_fireExtinguisher != "") {
            updateData.img_fireExtinguisherPath =
              "otherdetails/" +
              "imagefir-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_fireExtinguisher = base64img_fireExtinguisher.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_fireExtinguisherPath,
              base64img_fireExtinguisher,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_damageDentPath) {
          if (base64img_damageDent != "") {
            updateData.img_damageDentPath =
              "otherdetails/" +
              "imagedam-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_damageDent = base64img_damageDent.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_damageDentPath,
              base64img_damageDent,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }

        if (updateData.img_noOfKeysPath) {
          if (base64img_noOfKeys != "") {
            updateData.img_noOfKeysPath =
              "otherdetails/" +
              "imagekeys-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_noOfKeys = base64img_noOfKeys.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_noOfKeysPath,
              base64img_noOfKeys,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_instrumentCluster) {
          if (base64img_instrumentCluster !== "") {
            updateData.img_instrumentCluster =
              "otherdetails/" +
              "imagekeys-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_instrumentCluster = base64img_instrumentCluster.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_instrumentCluster,
              base64img_instrumentCluster,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.customerSignaturePath) {
          if (base64customerSignature != "") {
            updateData.customerSignaturePath =
              "otherdetails/" +
              "imagecust-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64customerSignature = base64customerSignature.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.customerSignaturePath,
              base64customerSignature,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_frontPath) {
          if (base64img_front.length > 0) {
            updateData.img_frontPath =
              "otherdetails/" +
              "front-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_front = base64img_front.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_frontPath,
              base64img_front,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
          F;
        }
        if (updateData.img_frontRightPath) {
          if (base64img_frontRight > 0) {
            updateData.img_frontRightPath =
              "otherdetails/" +
              "front-right-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_frontRight = base64img_frontRight.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_frontRightPath,
              base64img_frontRight,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_frontLeftPath) {
          if (base64img_frontLeft > 0) {
            updateData.img_frontLeftPath =
              "otherdetails/" +
              "front-left-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_frontLeft = base64img_frontLeft.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_frontLeftPath,
              base64img_frontLeft,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_sideRightPath) {
          if (base64img_sideRight > 0) {
            updateData.img_sideRightPath =
              "otherdetails/" +
              "side-right-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_sideRight = base64img_sideRight.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_sideRightPath,
              base64img_sideRight,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_sideLeftPath) {
          if (base64img_sideLeft > 0) {
            updateData.img_sideLeftPath =
              "otherdetails/" +
              "side-left-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_sideLeft = base64img_sideLeft.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_sideLeftPath,
              base64img_sideLeft,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_rearRightPath) {
          if (base64img_rearRight > 0) {
            updateData.img_rearRightPath =
              "otherdetails/" +
              "rear-right-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_rearRight = base64img_rearRight.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_rearRightPath,
              base64img_rearRight,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_rearLeftPath) {
          if (base64img_rearLeft > 0) {
            updateData.img_rearLeftPath =
              "otherdetails/" +
              "rear-left-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_rearLeft = base64img_rearLeft.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_rearLeftPath,
              base64img_rearLeft,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (updateData.img_rearPath) {
          if (base64img_rear > 0) {
            updateData.img_rearPath =
              "otherdetails/" +
              "rear-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_rear = base64img_rear.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + updateData.img_rearPath,
              base64img_rear,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }

        const updatedOtherDetails = await otherDetailsModel.findOneAndUpdate(
          { orderNo },
          updateData,
          { new: true }
        );
        if (!updatedOtherDetails) {
          res.status(300).json({ err: 300, msg: "Failed to update data." });
          return;
        }
        const response = {
          err: 200,
          msg: "Info updated successfully",
          data: updatedOtherDetails.toJSON(),
        };
        let statusUpdate = await BasicInfo.findOneAndUpdate(
          { orderNo },
          { otherDetailsStep: true },
          { new: true }
        );
        res.status(200).json(response);
      } else {
        const newOtherDetails = await new otherDetailsModel({
          orderNo,
          tools,
          cigLighter,
          spareWheel,
          radioCassete,
          lightCondition,
          fireExtinguisher,
          damageDent,
          noOfKeys,
          instrumentCluster,
          inspectedBy,
          fuelLevel,
          odometerReading,
          signature_InspectedBy,
          good,
          noGood,
          nonGenuine,
          notFixed,
          doubleMat,
          noGoodOthers: {
            status: noGoodOthers.status,
            text: noGoodOthers.text,
          },
          cash,
          creditCard,
          cheque,
          payMethodOthers: {
            status: payMethodOthers.status,
            text: payMethodOthers.text,
          },
          replacedParts,
          carWash,
          valuable,
          protectiveCoversSeat,
          protectiveCoversFloor,
          receptionDate,
          receptionTime,
          accessoriesInstallation,
          staffName,
          memoText,
          front,
          frontRight,
          frontLeft,
          sideRight,
          sideLeft,
          rearRight,
          rearLeft,
          rear,
        });
        console.log("newOtherDetails", newOtherDetails);
        if (newOtherDetails.img_toolsPath) {
          if (base64img_tools > 0) {
            newOtherDetails.img_toolsPath =
              "otherdetails/" +
              "imagetools-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_tools = base64img_tools.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_toolsPath,
              base64img_tools,
              "base64",
              function (err) {}
            );
          }
        }

        if (newOtherDetails.img_cigLighterPath) {
          if (base64img_cigLighter > 0) {
            newOtherDetails.img_cigLighterPath =
              "otherdetails/" +
              "imagecig-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_cigLighter = base64img_cigLighter.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_cigLighterPath,
              base64img_cigLighter,
              "base64",
              function (err) {}
            );
          }
        }
        if (newOtherDetails.img_spareWheelPath) {
          if (base64img_spareWheel != "") {
            newOtherDetails.img_spareWheelPath =
              "otherdetails/" +
              "imagespwh-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_spareWheel = base64img_spareWheel.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_spareWheelPath,
              base64img_spareWheel,
              "base64",
              function (err) {}
            );
          }
        }
        if (newOtherDetails.img_radioCassetePath) {
          if (base64img_radioCassete != "") {
            newOtherDetails.img_radioCassetePath =
              "otherdetails/" +
              "imagerdcs-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_radioCassete = base64img_radioCassete.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_radioCassetePath,
              base64img_radioCassete,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_lightConditionPath) {
          if (base64img_lightCondition != "") {
            newOtherDetails.img_lightConditionPath =
              "otherdetails/" +
              "imagelig-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_lightCondition = base64img_lightCondition.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_lightConditionPath,
              base64img_lightCondition,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }

        if (newOtherDetails.img_fireExtinguisherPath) {
          if (base64img_fireExtinguisher != "") {
            newOtherDetails.img_fireExtinguisherPath =
              "otherdetails/" +
              "imagefir-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_fireExtinguisher = base64img_fireExtinguisher.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_fireExtinguisherPath,
              base64img_fireExtinguisher,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_damageDentPath) {
          if (base64img_damageDent != "") {
            newOtherDetails.img_damageDentPath =
              "otherdetails/" +
              "imagedam-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_damageDent = base64img_damageDent.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_damageDentPath,
              base64img_damageDent,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }

        if (newOtherDetails.img_noOfKeysPath) {
          if (base64img_noOfKeys != "") {
            newOtherDetails.img_noOfKeysPath =
              "otherdetails/" +
              "imagekeys-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_noOfKeys = base64img_noOfKeys.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_noOfKeysPath,
              base64img_noOfKeys,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_instrumentCluster) {
          if (base64img_instrumentCluster !== "") {
            newOtherDetails.img_instrumentCluster =
              "otherdetails/" +
              "imagekeys-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_instrumentCluster = base64img_instrumentCluster.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_instrumentCluster,
              base64img_instrumentCluster,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.customerSignaturePath) {
          if (base64customerSignature != "") {
            newOtherDetails.customerSignaturePath =
              "otherdetails/" +
              "imagecust-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64customerSignature = base64customerSignature.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.customerSignaturePath,
              base64customerSignature,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_frontPath) {
          if (base64img_front > 0) {
            newOtherDetails.img_frontPath =
              "otherdetails/" +
              "front-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_front = base64img_front.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_frontPath,
              base64img_front,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_frontRightPath) {
          if (base64img_frontRight > 0) {
            newOtherDetails.img_frontRightPath =
              "otherdetails/" +
              "front-right-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_frontRight = base64img_frontRight.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_frontRightPath,
              base64img_frontRight,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_frontLeftPath) {
          if (base64img_frontLeft > 0) {
            newOtherDetails.img_frontLeftPath =
              "otherdetails/" +
              "front-left-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_frontLeft = base64img_frontLeft.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_frontLeftPath,
              base64img_frontLeft,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_sideRightPath) {
          if (base64img_sideRight > 0) {
            newOtherDetails.img_sideRightPath =
              "otherdetails/" +
              "side-right-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_sideRight = base64img_sideRight.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_sideRightPath,
              base64img_sideRight,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_sideLeftPath) {
          if (base64img_sideLeft > 0) {
            newOtherDetails.img_sideLeftPath =
              "otherdetails/" +
              "side-left-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_sideLeft = base64img_sideLeft.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_sideLeftPath,
              base64img_sideLeft,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_rearRightPath) {
          if (base64img_rearRight > 0) {
            newOtherDetails.img_rearRightPath =
              "otherdetails/" +
              "rear-right-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_rearRight = base64img_rearRight.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_rearRightPath,
              base64img_rearRight,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_rearLeftPath) {
          if (base64img_rearLeft > 0) {
            newOtherDetails.img_rearLeftPath =
              "otherdetails/" +
              "rear-left-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_rearLeft = base64img_rearLeft.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_rearLeftPath,
              base64img_rearLeft,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }
        if (newOtherDetails.img_rearPath) {
          if (base64img_rear > 0) {
            newOtherDetails.img_rearPath =
              "otherdetails/" +
              "rear-" +
              (Math.random() + 1).toString(36).substring(7) +
              ".png";
            base64img_rear = base64img_rear.replace(
              /^data:image\/[a-z]*;base64,/,
              ""
            );
            fs.writeFile(
              "uploads/" + newOtherDetails.img_rearPath,
              base64img_rear,
              "base64",
              function (err) {
                // Handle any error or perform additional operations if needed
              }
            );
          }
        }

        newOtherDetails.save().then(async (result) => {
          res
            .status(200)
            .json({ err: 200, msg: "Info saved successfully", data: result });
          let statusUpdate = await BasicInfo.findOneAndUpdate(
            { orderNo },
            { otherDetailsStep: true },
            { new: true }
          );
        });
      }
    }
  } catch (error) {
    res.status(500).json({ err: 500, msg: error.toString() });
  }
};
