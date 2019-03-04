export const testHandler = async (handler, options = {}) => {

  const res = {
    _json: null,
    _message: null,
    _status: null,
    status: function(status) {
      if(!status) return this._status
      this._status = status
      return this
    },
    json: function(json) {
      if(!json) return this._json
      this._json = json
      return this
    },
    send: function(message) {
      if(!message) return this._message
      this._message = message
      return this
    }
  }

  const req = {
    body: {},
    headers: {},
    params: {},
    query: {},
    ...options,
    trx: global.knex
  }

  await handler(req, res)

  return res

}
