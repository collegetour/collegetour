const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('colleges').del()

  await knex('colleges').insert([
    {
      id: 1,
      name: 'Boston University',
      city: 'Boston',
      state: 'MA',
      logo_id: 1,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      name: 'Brown University',
      city: 'Providence',
      state: 'RI',
      logo_id: 2,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      name: 'Cornell University',
      city: 'Ithaca',
      state: 'NY',
      logo_id: 3,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      name: 'Dickenson University',
      city: 'Carlisle',
      state: 'PA',
      logo_id: 4,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 5,
      name: 'Drexel University',
      city: 'Philadelphia',
      state: 'PA',
      logo_id: 5,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 6,
      name: 'Haverford College',
      city: 'Haverford',
      state: 'PA',
      logo_id: 6,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 7,
      name: 'Swarthmore College',
      city: 'Swarthmore',
      state: 'PA',
      logo_id: 7,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 8,
      name: 'University of Pennsylvania',
      city: 'Philadelphia',
      state: 'PA',
      logo_id: 8,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 9,
      name: 'Vassar College',
      city: 'Poughkeepsie',
      state: 'NY',
      logo_id: 9,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 10,
      name: 'Villanova University',
      city: 'Villanova',
      state: 'PA',
      logo_id: 10,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 11,
      name: 'Wesleyan University',
      city: 'Middletown',
      state: 'CT',
      logo_id: 11,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 12,
      name: 'Muhlenberg College',
      city: 'Allentown',
      state: 'PA',
      logo_id: 18,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    }
  ])
}
