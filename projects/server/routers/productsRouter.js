const { products } = require("../controllers/index");
const express = require("express");

const router = express.Router();

router.get("/", products.getAllProducts)

module.exports = router;