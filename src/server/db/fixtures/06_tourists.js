const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('tourists').del()

  await knex('tourists').insert([
    {
      tour_id: 1,
      user_id: 1,
      claimed_at: moment(),
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      user_id: 2,
      claimed_at: null,
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      user_id: 3,
      claimed_at: null,
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      user_id: 4,
      claimed_at: moment(),
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 2,
      user_id: 1,
      claimed_at: moment(),
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
