const express = require('express')
const router = express.Router()
const { qnaController } = require('../controllers')

router.post('/questions/add-question/:id',qnaController.addQuestion)
module.exports=router