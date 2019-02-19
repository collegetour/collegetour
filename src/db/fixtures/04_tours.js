const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('tours').del()

  await knex('tours').insert([
    {
      owner_id: 1,
      name: 'Winter Break Trip',
      start_date: '2019-02-18',
      end_date: '2019-02-18',
      origin: '322 S Geneva St, Ithaca, NY 14850',
      destination: '322 S Geneva St, Ithaca, NY 14850',
      created_at: moment(),
      updated_at: moment()
    },
    {
      owner_id: 1,
      name: 'Spring Break Trip',
      start_date: '2019-04-10',
      end_date: '2019-04-15',
      origin: '322 S Geneva St, Ithaca, NY 14850',
      destination: '322 S Geneva St, Ithaca, NY 14850',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
