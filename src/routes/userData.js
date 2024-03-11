const express = require('express');
const router = express.Router();
const userService = require('../services/userData');
const UserRequestDto = require('../dto/userRequestDto');
const path = require('path');

router.post('/', async function (req, res, next) {
  const userData = new UserRequestDto(req.body);

  try {
    const imagePath = await userService.processUserData(userData);// TODO: temp solution
    const options = {
      root: path.resolve('src')
    };

    res.sendFile(imagePath, options, function (err) {
      if (err) {
        console.error('Error sending file:', err);
      } else {
        console.log('Sent:', imagePath);
      }
    });
  } catch (err) {
    console.error('Error while processing user data ', err.message);
    next(err);
  }
});

module.exports = router;
