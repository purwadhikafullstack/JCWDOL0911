const express = require('express')
const router = express.Router()
const { qnaController } = require('../controllers')

router.post('/questions/add-question/:id', qnaController.addQuestion)
router.delete('/questions/remove-question/:id', qnaController.deleteQuestion)
router.get('/questions/my-question/:id',qnaController.fetchUserQuestion)
router.get('/questions/all-questions',qnaController.fetchAllQuestion)
module.exports=router