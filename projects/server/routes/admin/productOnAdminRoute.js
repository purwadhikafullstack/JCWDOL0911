const express = require("express");
const router = express.Router();
const { productController } = require("../../controllers");
const { verifyToken } = require("../../middleware/authVerification");
const { isAdmin } = require("../../middleware/isAdmin");
const upload = require("../../middleware/multerProduct");

router.get(
  "/all",
  verifyToken,
  isAdmin,
  productController.getAllProductOnAdminDashboard
);
router.get(
  "/:idproduct",
  verifyToken,
  isAdmin,
  productController.getDetailProductOnAdminDashboard
);
router.post("/", upload.single("file"), productController.createProduct);
router.put(
  "/:idProduct",
  upload.single("file"),
  productController.updateProduct
);
router.delete("/:idProduct", productController.deleteProduct);

module.exports = router;
