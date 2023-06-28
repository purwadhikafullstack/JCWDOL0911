const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers")

router.post("/", categoryController.createCategory)
router.put("/:idCategory", categoryController.updateCategory)
router.delete("/:idCategory", categoryController.deleteCategory)
router.get("/", categoryController.getAllCategory)

module.exports = router;