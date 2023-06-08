const express = require("express");
const router = express.Router();
const { productController } = require("../controllers");

router.get("/latest", productController.getLatestProduct);
router.get("/filter", productController.getAllProductsByFilter);

module.exports = router;
