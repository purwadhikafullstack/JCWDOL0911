const express = require("express");
const router = express.Router();
const { prescriptionController } = require("../controllers");
const uploadPrescription = require("../middleware/multerPrescription");

router.post(
  "/upload/:iduser",
  uploadPrescription,
  prescriptionController.uploadPrescription
);

module.exports = router;
