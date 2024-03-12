class MeteorRequestDto {
  constructor(query) {
    this.startDate = typeof query.start_date !== 'undefined' ? new Date(query.start_date) : null;
    this.endDate = typeof query.end_date !== 'undefined' ? new Date(query.end_date) : null;
    this.countOnly = query.count === 'true';
    this.wereDangerous = query.were_dangerous_meteors === 'true';
  }
}

module.exports = MeteorRequestDto;
