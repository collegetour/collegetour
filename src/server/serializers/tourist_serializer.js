const tourist_serializer = (tourist) => ({
  id: tourist.get('id'),
  user: {
    id: tourist.related('user').get('id'),
    full_name: tourist.related('user').get('full_name'),
    initials: tourist.related('user').get('initials'),
    email: tourist.related('user').get('email'),
    photo: tourist.related('user').get('photo_id') ? tourist.related('user').related('photo').get('url') : null
  },
  claimed_at: tourist.get('claimed_at'),
  created_at: tourist.get('created_at'),
  updated_at: tourist.get('updated_at')
})

export default tourist_serializer
