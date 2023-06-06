const express = require('express')
const router = express.Router()
const { usersController } = require('../controllers')
const upload = require('../middleware/multerUsers')

router.get('/profiles/:id',usersController.fetchUser)
router.post('/profiles/upload-picture/:id', upload, usersController.uploadPicture)
router.post('/profiles/edit-profiles/:id',usersController.editProfiles)

module.exports=router