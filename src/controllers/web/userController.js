const userService = require('../../services/userData');
const roverPhotoService = require('../../services/roverPhotos');
const UserRequestDto = require('../../dto/userRequestDto');

const getRoverPhoto = async (req, res, next) => {
  const userData = new UserRequestDto(req.body);

  try {
    // eslint-disable-next-line
    const userInfoProceeded = await userService.processUserData(userData); // TODO: temp solution
    const photoUrl = await roverPhotoService.getRoverPhoto();

    res.render('user.html', { photoUrl: photoUrl, name: userData.userName });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRoverPhoto,
};
