const express = require("express");
const router = express.Router();
const { productController } = require("../controllers");

router.get("/latest", productController.getLatestProduct);
router.get("/filter", productController.getAllProductsByFilter);
// router.get("", productController.adminProduct);
router.put("/stock/:idProduct", productController.updateStock);

module.exports = router;
