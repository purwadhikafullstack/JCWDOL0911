const express = require('express')
const router = express.Router()
const { transactionController } = require('../controllers/index')

router.put('/confirm-delivery/:idTransaction',transactionController.confirmDelivery)

module.exports = router;
