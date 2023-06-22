const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers");

router.post("/setorder/:iduser", orderController.uploadOrder);

module.exports = router;
