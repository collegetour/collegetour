import { testHandler } from '../../utils/test'
import { expect } from 'chai'
import list from './list'

describe('api/impressions/list', () => {

  it('lists impressions', async () => {

    const req = {
      visit: {
        get: () => 1
      }
    }

    const res = await testHandler(list, req)

    expect(res.status()).to.be.equal(200)
    expect(res.json().data.length).to.be.equal(1)

  })

})
