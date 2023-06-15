const express = require("express");
const router = express.Router();
const { addressController } = require("../controllers");

router.get('/provinces',addressController.ProvinceList)
router.get('/primary/:userId', addressController.primaryUserAddres)
router.get('/:userId',addressController.userAddres)
router.delete('/:idAddress', addressController.removeAddress)
router.put('/:idAddress', addressController.setPrimary)
module.exports=router
