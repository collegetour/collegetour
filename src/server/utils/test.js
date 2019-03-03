export const testHandler = async (handler, options = {}) => {

  const res = {
    _status: null,
    _json: null,
    status: function(status) {
      if(!status) return this._status
      this._status = status
      return this
    },
    json: function(json) {
      if(!json) return this._json
      this._json = json
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
