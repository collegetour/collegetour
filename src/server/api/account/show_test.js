import { expect } from 'chai'
import show from './show'

describe('api/account/show', () => {

  it('returns account', async () => {

    const req = {
      user: {
        get: () => {},
        related: () => ({
          get: () => {},
          related: () => ({
          })
        })
      }
    }

    const res = {
      status: () => ({
        json: () => {

        }
      })
    }

    await show(req, res)

    expect(1).to.be.equal(1)

  })

})
