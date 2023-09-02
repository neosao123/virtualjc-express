const router = require("express").Router();
const userRoutes = require("./userRoutes");
const SymptomsCategoryRoutes = require("./symptoms.category.routes");
const SymptomChecksRoutes = require("./symptoms.checks.routes ")
const basicinfoRoutes = require("./basicInfo.routes");
const CustomerRequestRoutes = require("./customer.request.routes");
const JobdetailsRoutes = require("./jobDeatails.routes");
const OtherDetailsRoutes = require("./other.details.routes");
const DasboardRoutes = require("./dashboard.api.routes");
const DetailedInfoRoutes = require("./detail.info.routes");
const DiagnosticQuestionaireRoutes = require("./diagnostic.questionaire.routes");

const JIbasicInfoRoutes = require("./Job Instructions/JI.basicInfo.routes");
const JIJobdetailsRoutes = require("./Job Instructions/Ji.detailInfo.routes");
const JICarwashRoutes = require("./Job Instructions/JI.CarWash.Routes");
const JICDeliveryInfoRoutes = require("./Job Instructions/JI.Delivery.Routes");
const JIFollowUpRoutes = require("./Job Instructions/JI.postServiceFollowUp.Routes");
const pdfRoutes = require("./pdf.routes");
const sampleRoute = require("./Sample");

router.use("/api/users", userRoutes);
router.use("/api/basicinfo", basicinfoRoutes);
router.use("/api/detailinfo", DetailedInfoRoutes);
router.use("/api/symptomscategory", SymptomsCategoryRoutes);
router.use("/api/symptomscheck", SymptomChecksRoutes);
router.use("/api/customerrequest", CustomerRequestRoutes)
router.use("/api/jobdetails", JobdetailsRoutes)
router.use("/api/otherdetails", OtherDetailsRoutes);
router.use("/api/dashboard", DasboardRoutes);
router.use("/api/diagnosticque", DiagnosticQuestionaireRoutes);
router.use("/api/jibasicinfo", JIbasicInfoRoutes);
router.use("/api/jidetailinfo", JIJobdetailsRoutes);
router.use("/api/jicarwash", JICarwashRoutes);
router.use("/api/jideliveryinfo", JICDeliveryInfoRoutes);
router.use("/api/jipostservice", JIFollowUpRoutes);
router.use("/api", sampleRoute);
router.use("/api/html-pdf", pdfRoutes);

module.exports = router;