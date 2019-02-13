const impression_serializer = (impression) => ({
  id: impression.get('id'),
  asset: impression.related('asset').get('url'),
  type: impression.get('type'),
  user: {
    id: impression.related('user').get('id'),
    full_name: impression.related('user').get('full_name'),
    initials: impression.related('user').get('initials'),
    photo: impression.related('user').get('photo_id') ? impression.related('user').related('photo').get('url') : null
  },
  caption: impression.get('caption'),
  created_at: impression.get('created_at'),
  updated_at: impression.get('updated_at')
})

export default impression_serializer
