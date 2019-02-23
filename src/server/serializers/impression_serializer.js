const impression_serializer = (impression) => ({
  id: impression.get('id'),
  asset: impression.get('asset_id') ? impression.related('asset').get('url') : null,
  type: impression.get('type'),
  user: {
    id: impression.related('user').get('id'),
    full_name: impression.related('user').get('full_name'),
    initials: impression.related('user').get('initials'),
    photo: impression.related('user').get('photo_id') ? impression.related('user').related('photo').get('url') : null
  },
  college: {
    name: impression.related('visit').related('college').get('name'),
    city: impression.related('visit').related('college').get('city'),
    state: impression.related('visit').related('college').get('state')
  },
  text: impression.get('text'),
  created_at: impression.get('created_at'),
  updated_at: impression.get('updated_at')
})

export default impression_serializer
