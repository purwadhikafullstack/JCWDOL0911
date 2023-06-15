const express = require("express");
const router = express.Router();
const { addressController } = require("../controllers/index");

router.post("/new", addressController.addAddress);

module.exports = router;
