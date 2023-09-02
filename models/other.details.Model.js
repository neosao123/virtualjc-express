const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let otherDetails = new Schema(
  {
    orderNo: {
      type: String,
      requred: true,
    },
    tools: {
      type: Boolean,
      default: false,
    },
    img_toolsPath: {
      type: [String],
      limit: 2,
    },
    cigLighter: {
      type: Boolean,
      default: false,
    },
    img_cigLighterPath: {
      type: String,
    },
    spareWheel: {
      type: Boolean,
      default: false,
    },
    img_spareWheelPath: {
      type: String,
    },
    radioCassete: {
      type: Boolean,
      default: false,
    },
    img_radioCassetePath: {
      type: String,
    },
    lightCondition: {
      type: Boolean,
      default: false,
    },
    img_lightConditionPath: {
      type: String,
    },
    fireExtinguisher: {
      type: Boolean,
      default: false,
    },
    img_fireExtinguisherPath: {
      type: String,
    },
    damageDent: {
      type: Boolean,
      default: false,
    },
    img_damageDentPath: {
      type: String,
    },
    noOfKeys: {
      type: Boolean,
      default: false,
    },
    img_noOfKeysPath: {
      type: String,
    },
    instrumentCluster: {
      type: Boolean,
      default: false,
    },
    img_instrumentCluster: {
      type: String,
    },
    inspectedBy: {
      type: String,
      default: "",
    },
    signature_InspectedBy: {
      type: String,
    },
    fuelLevel: {
      type: String,
      default: "",
    },
    odometerReading: {
      type: String,
      default: "",
    },
    customerSignaturePath: {
      type: String,
    },
    good: {
      type: Boolean,
    },
    noGood: {
      type: Boolean,
    },
    nonGenuine: {
      type: Boolean,
    },
    notFixed: {
      type: Boolean,
    },
    doubleMat: {
      type: Boolean,
    },
    noGoodOthers: {
      type: mongoose.Schema.Types.Mixed,
    },
    cash: {
      type: Boolean,
    },
    creditCard: {
      type: Boolean,
    },
    cheque: {
      type: Boolean,
    },
    payMethodOthers: {
      type: mongoose.Schema.Types.Mixed,
    },
    replacedParts: {
      type: Boolean,
    },
    carWash: {
      type: Boolean,
    },
    valuable: {
      type: Boolean,
    },
    protectiveCoversSeat: {
      type: Boolean,
    },
    protectiveCoversFloor: {
      type: Boolean,
    },
    receptionDate: {
      type: String,
    },
    receptionTime: {
      type: String,
    },
    accessoriesInstallation: {
      type: Boolean,
    },
    staffName: {
      type: String,
    },
    memoText: {
      type: String,
    },
    front: {
      type: Boolean,
      default: false,
    },
    img_frontPath: {
      type: [String],
    },
    frontRight: {
      type: Boolean,
      default: false,
    },
    img_frontRightPath: {
      type: [String],
    },
    frontLeft: {
      type: Boolean,
      default: false,
    },
    img_frontLeftPath: {
      type: [String],
    },
    sideRight: {
      type: Boolean,
      default: false,
    },
    img_sideRightPath: {
      type: [String],
    },
    sideLeft: {
      type: Boolean,
      default: false,
    },
    img_sideLeftPath: {
      type: [String],
    },
    rearRight: {
      type: Boolean,
      default: false,
    },
    img_rearRightPath: {
      type: [String],
    },
    rearLeft: {
      type: Boolean,
      default: false,
    },
    img_rearLeftPath: {
      type: [String],
    },
    rear: {
      type: Boolean,
      default: false,
    },
    img_rearPath: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otherDetails", otherDetails);
