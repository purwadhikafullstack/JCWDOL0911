const express = require("express");
const router = express.Router();
const { productController } = require("../controllers");

router.get("/latest", productController.getLatestProduct);
router.get("/filter", productController.getAllProductsByFilter);
router.get('', productController.adminProduct)
router.put('/stock/:idProduct', productController.updateStock)
router.post('/unit-conversions', productController.UnitConversionRules)
router.get('/rules', productController.fetchRules)
router.post('/assign-rule/:idProduct', productController.setConversionRules)
router.put('/change-unit/:idProduct', productController.changeDefaultUnit)
router.delete('/remove-rule/:idProduct',productController.removeRule)

module.exports = router;
