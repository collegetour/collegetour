const tour_serializer = (tour) => ({
  id: tour.get('id'),
  name: tour.get('name'),
  start_date: tour.get('start_date'),
  end_date: tour.get('end_date'),
  start_address: tour.get('start_address'),
  end_address: tour.get('end_address'),
  created_at: tour.get('created_at'),
  updated_at: tour.get('updated_at')
})

export default tour_serializer
