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
    }
  ])

}
