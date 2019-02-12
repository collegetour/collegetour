const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('impressions').del()

  await knex('impressions').insert([
    {
      id: 1,
      type: 'image',
      visit_id: 1,
      user_id: 1,
      asset_id: 16,
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      type: 'image',
      visit_id: 1,
      user_id: 3,
      asset_id: 17,
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      type: 'video',
      visit_id: 1,
      user_id: 1,
      asset_id: 16,
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      type: 'video',
      visit_id: 1,
      user_id: 3,
      asset_id: 17,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
