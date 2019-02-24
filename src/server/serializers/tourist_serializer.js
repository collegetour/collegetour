const tourist_serializer = (tourist) => ({
  id: tourist.get('id'),
  user: {
    id: tourist.related('user').get('id'),
    first_name: tourist.related('user').get('first_name'),
    full_name: tourist.related('user').get('full_name'),
    initials: tourist.related('user').get('initials'),
    email: tourist.related('user').get('email'),
    photo: tourist.related('user').get('photo_id') ? tourist.related('user').related('photo').get('url') : null
  },
  tour: {
    id: tourist.related('tour').get('id'),
    owner_id: tourist.related('tour').get('owner_id'),
    name: tourist.related('tour').get('name')
  },
  claimed_at: tourist.get('claimed_at'),
  created_at: tourist.get('created_at'),
  updated_at: tourist.get('updated_at')
})

export default tourist_serializer
