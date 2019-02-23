const user_serializer = (user) => ({
  id: user.get('id'),
  full_name: user.get('full_name'),
  photo: user.get('photo_id') ? user.related('photo').get('url') : null,
  created_at: user.get('created_at'),
  updated_at: user.get('updated_at')
})

export default user_serializer
