const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('users').del()

  await knex('users').insert([
    {
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'greg@thinktopography.com',
      photo_id: 12,
      instagram_id: '1560577',
      facebook_id: '10156132195932338',
      google_id: '108572669723879041659',
      agreed_to_terms: true,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
