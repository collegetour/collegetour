const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('colleges').del()

  await knex('colleges').insert([
    {
      name: 'Boston University',
      city: 'Boston',
      state: 'MA',
      phone: '(617) 353-2300',
      website: 'http://www.bu.edu/admissions/',
      logo_id: 1,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Brown University',
      city: 'Providence',
      state: 'RI',
      phone: '(401) 863-2378',
      website: 'https://www.brown.edu/admission/undergraduate/undergraduate-admission',
      logo_id: 2,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Cornell University',
      city: 'Ithaca',
      state: 'NY',
      phone: '(607) 255.5241',
      website: '(607) 255-5241',
      logo_id: 3,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Dickenson University',
      city: 'Carlisle',
      state: 'PA',
      phone: '(717) 245-1231',
      website: 'https://www.dickinson.edu/homepage/287/admissions',
      logo_id: 4,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Drexel University',
      city: 'Philadelphia',
      state: 'PA',
      phone: 'https://drexel.edu/admissions/overview',
      website: '',
      logo_id: 5,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Haverford College',
      city: 'Haverford',
      state: 'PA',
      phone: '(610) 896-1350',
      website: 'https://www.haverford.edu/admission',
      logo_id: 6,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Swarthmore College',
      city: 'Swarthmore',
      state: 'PA',
      phone: '(610) 328-8300',
      website: 'https://www.swarthmore.edu/admissions-aid',
      logo_id: 7,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'University of Pennsylvania',
      city: 'Philadelphia',
      state: 'PA',
      phone: '(215) 898-7507',
      website: 'https://www.upenn.edu/admissions',
      logo_id: 8,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Vassar College',
      city: 'Poughkeepsie',
      state: 'NY',
      phone: '(845) 437-7300',
      website: 'https://admissions.vassar.edu',
      logo_id: 9,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Villanova University',
      city: 'Villanova',
      state: 'PA',
      phone: '(610) 519-4000',
      website: 'https://www1.villanova.edu/university/undergraduate-admission.html',
      logo_id: 10,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Wesleyan University',
      city: 'Middletown',
      state: 'CT',
      phone: '(860) 685-3000',
      website: 'https://www.wesleyan.edu/admission',
      logo_id: 11,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    },
    {
      name: 'Muhlenberg College',
      city: 'Allentown',
      state: 'PA',
      phone: '(484) 664-3200',
      website: 'https://www.muhlenberg.edu/admissions',
      logo_id: 18,
      schedule: 'https://apply.vassar.edu/portal/campusvisitcalendar',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
