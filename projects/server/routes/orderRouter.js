const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers");

router.post("/setorder/:iduser", orderController.uploadOrder);
router.get("/waiting/:iduser", orderController.getWaitingOrder);
// router.get("/waitingproduct/:idtransaction", orderController.getWaitingProduct);
router.get("/review/:iduser", orderController.getReviewOrder);
router.get("/allwaiting", orderController.getAllWaitingOrder);

module.exports = router;
