const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('visits').del()

  await knex('visits').insert([
    {
      tour_id: 1,
      college_id: 9,
      delta: 1,
      info_session: '13:30:00',
      campus_tour: '14:30:00',
      date: '2019-02-18',
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      college_id: 11,
      delta: 2,
      info_session: '10:30:00',
      campus_tour: '9:30:00',
      date: '2019-02-19',
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      college_id: 7,
      delta: 3,
      info_session: '9:00:00',
      campus_tour: '10:00:00',
      date: '2019-02-20',
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      college_id: 6,
      delta: 4,
      info_session: '14:00:00',
      campus_tour: '15:00:00',
      date: '2019-02-22',
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      college_id: 8,
      delta: 5,
      info_session: '10:45:00',
      campus_tour: '9:45:00',
      date: '2019-02-22',
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      college_id: 12,
      delta: 6,
      info_session: '14:30:00',
      campus_tour: '15:30:00',
      date: '2019-02-23',
      created_at: moment(),
      updated_at: moment()
    },
    {
      tour_id: 1,
      college_id: 4,
      delta: 7,
      info_session: '10:15:00',
      campus_tour: '9:00:00',
      date: '2019-02-23',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
