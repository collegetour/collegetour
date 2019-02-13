const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('users').del()

  await knex('users').insert([
    {
      first_name: 'Greg',
      last_name: 'Kops',
      photo_id: 12,
      instagram_id: '1560577',
      facebook_id: '10156132195932338',
      google_id: '108572669723879041659',
      created_at: moment(),
      updated_at: moment()
    },
    {
      first_name: 'Alice',
      last_name: 'Kops',
      photo_id: 13,
      instagram_id: null,
      facebook_id: null,
      google_id: null,
      created_at: moment(),
      updated_at: moment()
    },
    {
      first_name: 'Margaret',
      last_name: 'Kops',
      photo_id: 14,
      instagram_id: null,
      facebook_id: null,
      google_id: null,
      created_at: moment(),
      updated_at: moment()
    },
    {
      first_name: 'Elinor',
      last_name: 'Kops',
      photo_id: 15,
      instagram_id: null,
      facebook_id: null,
      google_id: null,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
