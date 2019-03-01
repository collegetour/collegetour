class APIError extends Error {

  constructor({ code, message, errors }) {
    super(message)
    this.name = 'APIError'
    this.code = code
    this.message = message
    this.errors = errors
  }

}

export default APIError
