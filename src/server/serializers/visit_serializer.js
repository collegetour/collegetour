const visit_serializer = (visit) => ({
  id: visit.get('id'),
  delta: visit.get('delta'),
  college: {
    id: visit.related('college').get('id'),
    name: visit.related('college').get('name'),
    city: visit.related('college').get('city'),
    state: visit.related('college').get('state'),
    phone: visit.related('college').get('phone'),
    website: visit.related('college').get('website'),
    schedule: visit.related('college').get('schedule'),
    logo: visit.related('college').related('logo').get('url')
  },
  date: visit.get('date'),
  info_session: visit.get('info_session'),
  campus_tour: visit.get('campus_tour'),
  weather: visit.get('weather'),
  temp: visit.get('temp'),
  created_at: visit.get('created_at'),
  updated_at: visit.get('updated_at')
})

export default visit_serializer
