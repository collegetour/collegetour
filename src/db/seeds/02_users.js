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
      agreed_to_terms: false,
      created_at: moment(),
      updated_at: moment()
    },
    {
      first_name: 'Alice',
      last_name: 'Kops',
      email: 'portia@amklegal.com',
      photo_id: null,
      instagram_id: null,
      facebook_id: null,
      google_id: null,
      agreed_to_terms: true,
      created_at: moment(),
      updated_at: moment()
    },
    {
      first_name: 'Margaret',
      last_name: 'Kops',
      email: 'margaretthewarrior@gmail.com',
      photo_id: 14,
      instagram_id: null,
      facebook_id: null,
      google_id: null,
      agreed_to_terms: true,
      created_at: moment(),
      updated_at: moment()
    },
    {
      first_name: 'Elinor',
      last_name: 'Kops',
      email: 'elinorkkb@gmail.com',
      photo_id: null,
      instagram_id: null,
      facebook_id: null,
      google_id: null,
      agreed_to_terms: true,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
