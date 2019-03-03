import { testHandler } from '../../utils/test'
import User from '../../models/user'
import { expect } from 'chai'
import show from './show'

describe('api/account/show', () => {

  it('returns account', async () => {

    const account = {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'greg@thinktopography.com',
      photo_id: 12,
      photo: '/assets/12/greg.jpg',
      agreed_to_terms: true
    }

    const req = {
      user: await User.where('id', 1).fetch({
        withRelated: ['photo']
      })
    }

    const res = await testHandler(show, req)

    expect(res.status()).to.be.equal(200)
    expect(res.json().data).to.be.eql(account)

  })

})
