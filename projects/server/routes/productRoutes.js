const express = require("express");
const router = express.Router();
const { productController } = require("../controllers");
const upload = require("../middleware/multerProduct");

router.get("/latest", productController.getLatestProduct);
router.get("/filter", productController.getAllProductsByFilter);
router.get("/:idProduct", productController.getProductById);
router.post("/", upload.single("file"), productController.createProduct);
router.put("/:idProduct", upload.single("file"), productController.updateProduct);
router.delete("/:idProduct", productController.deleteProduct);

module.exports = router;
