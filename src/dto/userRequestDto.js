class UserRequestDto {
  constructor(userData) {
    this.userId = userData.user_id;
    this.userName = userData.user_name;
    this.apiKey = userData.api_key;
  }
}

module.exports = UserRequestDto;
