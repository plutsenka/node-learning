const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requestValidator = require('../middlewares/requestValidator');
const { userRequestSchema } = require('../schemas');

router.post('/', requestValidator(userRequestSchema), userController.getRoverPhoto);

module.exports = router;
