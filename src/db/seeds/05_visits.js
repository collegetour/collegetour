const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('visits').del()

  await knex('visits').insert([
    {
      id: 1,
      tour_id: 1,
      college_id: 9,
      delta: 1,
      info_session: '12:00:00',
      college_tour: '13:30:00',
      date: '2019-02-18',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      tour_id: 1,
      college_id: 11,
      delta: 2,
      info_session: '12:00:00',
      college_tour: '13:30:00',
      date: '2019-02-19',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      tour_id: 1,
      college_id: 7,
      delta: 3,
      info_session: '12:00:00',
      college_tour: '13:30:00',
      date: '2019-02-20',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      tour_id: 1,
      college_id: 6,
      delta: 4,
      info_session: '12:00:00',
      college_tour: '13:30:00',
      date: '2019-02-22',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 5,
      tour_id: 1,
      college_id: 8,
      delta: 5,
      info_session: '12:00:00',
      college_tour: '13:30:00',
      date: '2019-02-22',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 6,
      tour_id: 1,
      college_id: 12,
      delta: 6,
      info_session: '14:30:00',
      college_tour: '13:30:00',
      date: '2019-02-23',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 7,
      tour_id: 1,
      college_id: 4,
      delta: 7,
      info_session: '12:00:00',
      college_tour: '13:30:00',
      date: '2019-02-23',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
