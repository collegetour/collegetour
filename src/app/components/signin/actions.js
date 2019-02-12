export const signin = (email, password) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: 'http://localhost:8080/api/sites/sites/1/members/signin',
  body: { email, password },
  request: 'SIGNIN_REQUEST',
  success: 'SIGNIN_SUCCESS',
  failure: 'SIGNIN_FAILURE'
})
