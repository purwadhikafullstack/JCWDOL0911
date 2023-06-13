const express = require("express");
const router = express.Router();

const { rajaOngkirController } = require("../controllers/index");

// Router GET province
router.get("/province", rajaOngkirController.province);
router.get("/city/:provId", rajaOngkirController.city);

module.exports = router;
