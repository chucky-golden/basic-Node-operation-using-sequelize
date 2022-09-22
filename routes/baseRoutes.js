const registerController = require('../controllers/registerController');
const emailverifycontroller = require('../controllers/emailverifycontroller');
const gmailloginController = require('../controllers/gmailloginController');
const loginController = require('../controllers/loginController');
const forgotpassController = require('../controllers/forgotpassController');

const router = require('express').Router();

router.post("/register", registerController.register);
router.post("/emailverify", emailverifycontroller.emailverify);
router.post("/gmaillogin", gmailloginController.gmailLogin);
router.post("/login", loginController.login);
router.post("/forgotpass", forgotpassController.forgotpass);
router.post("/passwordreset", forgotpassController.reset);


module.exports = router;