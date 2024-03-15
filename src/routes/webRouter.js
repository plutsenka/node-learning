const express = require('express');
const router = express.Router();
const meteorController = require('../controllers/web/meteorsController');
const requestValidator = require('../middlewares/requestValidator');
const { meteorsRequestSchema, userRequestSchema } = require('../schemas');
const userController = require('../controllers/web/userController');

router.get('/meteors', requestValidator(meteorsRequestSchema), meteorController.getMeteors);
router.post('/user', requestValidator(userRequestSchema), userController.getRoverPhoto);

module.exports = router;
