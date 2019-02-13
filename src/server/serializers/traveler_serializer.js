const traveler_serializer = (traveler) => ({
  id: traveler.get('id'),
  user: {
    id: traveler.related('user').get('id'),
    full_name: traveler.related('user').get('full_name'),
    initials: traveler.related('user').get('initials'),
    email: traveler.related('user').get('email'),
    photo: traveler.related('user').get('photo_id') ? traveler.related('user').related('photo').get('url') : null
  },
  claimed_at: traveler.get('claimed_at'),
  created_at: traveler.get('created_at'),
  updated_at: traveler.get('updated_at')
})

export default traveler_serializer
