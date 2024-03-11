function format(meteor) {
  return {
    id: meteor.id,
    name: meteor.name,
    estimated_diameter_min: meteor.estimated_diameter.meters.estimated_diameter_min,
    estimated_diameter_max: meteor.estimated_diameter.meters.estimated_diameter_max,
    is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
    close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
    relative_velocity: meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
  };
}

module.exports = {
  format,
};
