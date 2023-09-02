const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const multer = require("multer");


// const imgconfig = multer.diskStorage({
//   destination: (req, file, callback) => {
//       callback(null, "./uploads/users");
//   },
//   filename: (req, file, callback) => {
//       callback(null, `image-${Date.now()}.${file.originalname}`);
//   },
// });
// const isImage = (req, file, callback) => {
//   if (file.mimetype.startsWith("image")) {
//       callback(null, true);
//   } else {
//       callback(new Error("Only image is allowed"));
//   }
// };


// const upload = multer({
//   storage: imgconfig,
//   fileFilter: isImage,
// });


// const upload = multer();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getsupervisor', auth, userController.getSuperviser);
router.post('/add', auth, userController.add);
router.post('/update',auth, userController.update);
router.post('/delete', auth, userController.delete);
router.get('/list', auth, userController.listUsers);
router.post('/resetpassword', auth, userController.AdminSideresetPassword);
router.post('/userresetpassword', auth, userController.UserResetPassword);

module.exports = router;

 

