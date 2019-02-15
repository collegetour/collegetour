import { encode } from '../lib/jwt'

const session_serializer = (user) => ({
  id: user.get('id'),
  full_name: user.get('full_name'),
  email: user.get('email'),
  photo: user.related('photo').get('url'),
  agreed_to_terms: user.get('agreed_to_terms'),
  token: encode(user.get('id'))
})

export default session_serializer
