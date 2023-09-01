const express = require("express");
// const AWS = require("aws-sdk");
const path = require('path');
const multer = require('multer');
const user  = require("../controllers/user");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
router.use(multer().single('file'));

router.post("/signup", user.signup);
router.post("/login", user.login);

module.exports = {
  "routes": router
};
