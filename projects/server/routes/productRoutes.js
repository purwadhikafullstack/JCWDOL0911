const express = require("express");
const router = express.Router();
const { productController } = require("../controllers");

router.get("/latest", productController.getLatestProduct);

module.exports = router;
