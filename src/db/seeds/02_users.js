const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('users').del()

  await knex('users').insert([
    {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      photo_id: 12,
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      first_name: 'Alice',
      last_name: 'Kops',
      photo_id: 13,
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      first_name: 'Margaret',
      last_name: 'Kops',
      photo_id: 14,
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      first_name: 'Elinor',
      last_name: 'Kops',
      photo_id: 15,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
