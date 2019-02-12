import { encode } from '../services/jwt'

const session_serializer = (user) => ({
  id: user.get('id'),
  full_name: user.get('full_name'),
  photo: user.related('photo').get('url'),
  token: encode(user.get('id'))
})

export default session_serializer
