const express = require('express');
const router = express.Router();
const requestValidator = require('../middlewares/requestValidator');
const { meteorsRequestSchema, userRequestSchema } = require('../schemas');
const meteorController = require('../controllers/api/meteorsController');
const userController = require('../controllers/api/userController');

router.get('/meteors', requestValidator(meteorsRequestSchema), meteorController.getMeteors);
router.post('/user', requestValidator(userRequestSchema), userController.getRoverPhoto);

module.exports = router;
