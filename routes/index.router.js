const express = require('express')
const router = express.Router()
const familyController = require('../controllers/family.controller')


router.post('/family/', familyController.saveFamilies)
router.get('/family/', familyController.getAll)

module.exports = router