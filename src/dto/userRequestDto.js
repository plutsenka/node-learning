class UserRequestDto {
  constructor(userData) {
    this.userId = typeof userData.user_id !== 'undefined' ? userData.user_id : null;
    this.userName = typeof userData.user_name !== 'undefined' ? userData.user_name : null;
    this.apiKey = typeof userData.api_key !== 'undefined' ? userData.api_key : null;
  }
}

module.exports = UserRequestDto;
