class MeteorRequest {
  constructor(query) {
    this.startDate = typeof query.start_date !== 'undefined' ? new Date(query.start_date) : null;
    this.endDate = typeof query.end_date !== 'undefined' ? new Date(query.end_date) : null;
    this.countOnly = typeof query.count !== 'undefined' && query.count === 'true';
    this.wereDangerous = typeof query.were_dangerous_meteors !== 'undefined' && query.were_dangerous_meteors === 'true';
  }
}

module.exports = MeteorRequest;
