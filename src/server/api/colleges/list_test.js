import { testHandler } from '../../utils/test'
import { expect } from 'chai'
import list from './list'

describe('api/colleges', () => {

  it('lists colleges', async () => {

    const res = await testHandler(list)

    expect(res.status()).to.be.equal(200)
    expect(res.json().data.length).to.be.equal(12)

  })

  it('filters colleges', async () => {

    const res = await testHandler(list, {
      query: {
        q: 'Cor'
      }
    })

    expect(res.status()).to.be.equal(200)
    expect(res.json().data.length).to.be.equal(1)

  })

})
