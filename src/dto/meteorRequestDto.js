class MeteorRequestDto {
  constructor(query) {
    this.startDate = query.start_date;
    this.endDate = query.end_date;
    this.countOnly = query.count;
    this.wereDangerous = query.were_dangerous_meteors;
  }
}

module.exports = MeteorRequestDto;
