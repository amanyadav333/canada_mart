const express = require("express");
// const AWS = require("aws-sdk");
const path = require('path');
const multer = require('multer');
const user  = require("../controllers/user");
const product  = require("../controllers/product");
const company_form  = require("../controllers/company_form");
const other  = require("../controllers/other");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage});
const router = express.Router();
router.use(multer().single('file'));

router.post("/signup", user.signup);
router.post("/login", user.login);
router.post("/enquiry", other.userEnquiry);
router.get("/getAllProducts", product.getAllProducts);
router.get("/checkUserExist", user.checkUserExist);
router.post("/addProducts", product.addProducts);
router.post("/sentEmailOTP", other.sentEmailOTP);
router.post("/updateUser", user.updateUser);
router.post("/getUserProfile", user.getUserProfile);
router.post("/addBusinessDetail", company_form.addBusinessDetail);
router.post("/addTypeService", company_form.addTypeService);
router.post("/addTaxInformation", company_form.addTaxInformation);
router.post("/getCompanyUserList", company_form.getCompanyUserList);
router.post("/getCompanyBusinessDetail", company_form.getCompanyBusinessDetail);
router.post("/getCompanyTypeService", company_form.getCompanyTypeService);
router.post("/getCompanyTaxInformation", company_form.getCompanyTaxInformation);
router.post("/uploadFile", other.uploadFile);

module.exports = {
  "routes": router
};
