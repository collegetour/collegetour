import { testHandler } from '../../utils/test'
import knex from '../../lib/knex'
import destroy from './destroy'
import { expect } from 'chai'

describe('api/impressions/destroy', () => {

  it('cannot destroy a nonexistant impression', async () => {

    const res = await testHandler(destroy, {
      visit: {
        get: () => 2
      },
      params: {
        id: 1
      }
    })

    expect(res.status()).to.be.equal(404)

  })

  it('destroys existing impression', async () => {

    const existing = await knex('impressions')
    expect(existing.length).to.be.equal(1)

    const res = await testHandler(destroy, {
      visit: {
        get: () => 1
      },
      params: {
        id: 1
      }
    })

    const remaining = await knex('impressions')
    expect(res.status()).to.be.equal(200)
    expect(res.json().data).to.be.null
    expect(remaining.length).to.be.equal(0)

  })
  
})
