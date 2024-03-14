class UserRequestDto {
  constructor(userData) {
    this.userId = userData.user_id ?? null;
    this.userName = userData.user_name ?? null;
    this.apiKey = userData.api_key ?? null;
  }
}

module.exports = UserRequestDto;
