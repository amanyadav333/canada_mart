const express = require("express");
// const AWS = require("aws-sdk");
const path = require('path');
const multer = require('multer');
const user  = require("../controllers/user");
const message  = require("../controllers/message");
const product  = require("../controllers/product");
const category  = require("../controllers/category");
const company_form  = require("../controllers/company_form");
const other  = require("../controllers/other");
const dashboard  = require("../controllers/dashboard");

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
router.post("/updateUser", user.updateUser);
router.post("/getUserProfile", user.getUserProfile);
router.post("/addBusinessDetail", company_form.addBusinessDetail);
router.post("/addTypeService", company_form.addTypeService);
router.post("/addTaxInformation", company_form.addTaxInformation);
router.post("/getCompanyUserList", company_form.getCompanyUserList);
router.post("/getCompanyBusinessDetail", company_form.getCompanyBusinessDetail);
router.post("/getCompanyTypeService", company_form.getCompanyTypeService);
router.post("/getCompanyTaxInformation", company_form.getCompanyTaxInformation);
router.get("/getAllCategory", category.getAllCategory);
router.get("/getAllSubCategory", category.getAllSubCategory);
router.post("/getSubCategoryByParentId", category.getSubCategoryByParentId);
router.post("/addCategory", category.addCategory);
router.post("/uploadFile", other.uploadFile);
router.post("/getUserList", user.getUserList);
router.post("/sentMessage", message.sentMessage);
router.post("/getMessage", message.getMessage);
router.post("/getDashBoardData", dashboard.getDashBoardData);
router.post("/getSellerDetail", dashboard.getSellerDetail);
router.post("/getProductsByCategory", product.getProductsByCategory);

module.exports = {
  "routes": router
};
