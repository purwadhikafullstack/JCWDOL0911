const express = require("express");
const router = express.Router();
const { productController } = require("../../controllers");
const { verifyToken } = require("../../middleware/authVerification");
const { isAdmin } = require("../../middleware/isAdmin");

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

module.exports = router;
