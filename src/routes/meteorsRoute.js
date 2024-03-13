const express = require('express');
const router = express.Router();
const meteorController = require('../controllers/meteorsController');
const requestValidator = require('../middlewares/requestValidator');
const { meteorsRequestSchema } = require('../schemas');

router.get('/', requestValidator(meteorsRequestSchema), meteorController.getMeteors);

module.exports = router;
