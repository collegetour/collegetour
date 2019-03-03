import { testHandler } from '../../utils/test'
import destroy from './destroy'
import { expect } from 'chai'

describe('api/impressions/destroy', () => {

  it('cannot destroy a nonexistant impression', async () => {

    const req = {
      visit: {
        get: () => 2
      },
      params: {
        id: 1
      }
    }

    const res = await testHandler(destroy, req)

    expect(res.status()).to.be.equal(404)

  })

  it('destroys existing impression', async () => {

    const existing = await global.trx('impressions')
    expect(existing.length).to.be.equal(1)

    const req = {
      visit: {
        get: () => 1
      },
      params: {
        id: 1
      }
    }

    const res = await testHandler(destroy, req)

    expect(res.status()).to.be.equal(200)
    expect(res.json().data).to.be.null
    const remaining = await global.trx('impressions')
    expect(remaining.length).to.be.equal(0)

  })

})
