const tour_serializer = (tour) => ({
  id: tour.get('id'),
  name: tour.get('name'),
  start_date: tour.get('start_date'),
  end_date: tour.get('end_date'),
  origin: tour.get('origin'),
  destination: tour.get('destination'),
  created_at: tour.get('created_at'),
  updated_at: tour.get('updated_at')
})

export default tour_serializer
