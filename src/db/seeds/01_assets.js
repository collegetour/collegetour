const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assets').del()

  await knex('assets').insert([
    {
      id: 1,
      original_file_name: 'boston.png',
      file_name: 'boston.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      original_file_name: 'brown.png',
      file_name: 'brown.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      original_file_name: 'cornell.png',
      file_name: 'cornell.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      original_file_name: 'dickenson.png',
      file_name: 'dickenson.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 5,
      original_file_name: 'drexel.png',
      file_name: 'drexel.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 6,
      original_file_name: 'haverford.jpg',
      file_name: 'haverford.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 7,
      original_file_name: 'swarthmore.png',
      file_name: 'swarthmore.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 8,
      original_file_name: 'upen.png',
      file_name: 'upen.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 9,
      original_file_name: 'vassar.png',
      file_name: 'vassar.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 10,
      original_file_name: 'villanova.png',
      file_name: 'villanova.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 11,
      original_file_name: 'wesleyan.png',
      file_name: 'wesleyan.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 12,
      original_file_name: 'greg.jpg',
      file_name: 'greg.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 13,
      original_file_name: 'alice.jpg',
      file_name: 'alice.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 14,
      original_file_name: 'margaret.jpg',
      file_name: 'margaret.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 15,
      original_file_name: 'elinor.jpg',
      file_name: 'elinor.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 16,
      original_file_name: 'cornell1.jpg',
      file_name: 'cornell1.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 17,
      original_file_name: 'cornell2.jpg',
      file_name: 'cornell2.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 18,
      original_file_name: 'muhlenberg.png',
      file_name: 'muhlenberg.png',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
