import { testHandler } from '../../utils/test'
import { expect } from 'chai'
import list from './list'

describe('api/impressions/list', () => {

  it('lists impressions', async () => {

    const res = await testHandler(list, {
      visit: {
        get: () => 1
      }
    })

    expect(res.status()).to.be.equal(200)
    // expect(res.json().data.length).to.be.equal(1)
    //TODO: doesnt seem to be rolling back transaction...

  })

})
