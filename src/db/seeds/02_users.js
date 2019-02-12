const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('users').del()

  await knex('users').insert([
    {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      photo_id: 12,
      instagram_access_token: '1560577.c4aa759.a8c42cb16bdb4dbc84bef42d4b51e155',
      facebook_access_token: '',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      first_name: 'Alice',
      last_name: 'Kops',
      photo_id: 13,
      instagram_access_token: '',
      facebook_access_token: '',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      first_name: 'Margaret',
      last_name: 'Kops',
      photo_id: 14,
      instagram_access_token: '',
      facebook_access_token: '',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      first_name: 'Elinor',
      last_name: 'Kops',
      photo_id: 15,
      instagram_access_token: '',
      facebook_access_token: '',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
