const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assets').del()

  await knex('assets').insert([
    {
      original_file_name: 'boston.png',
      file_name: 'boston.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'brown.png',
      file_name: 'brown.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'cornell.png',
      file_name: 'cornell.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'dickenson.png',
      file_name: 'dickenson.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'drexel.png',
      file_name: 'drexel.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'haverford.jpg',
      file_name: 'haverford.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'swarthmore.png',
      file_name: 'swarthmore.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'upen.png',
      file_name: 'upen.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'vassar.png',
      file_name: 'vassar.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'villanova.png',
      file_name: 'villanova.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'wesleyan.png',
      file_name: 'wesleyan.png',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'greg.jpg',
      file_name: 'greg.jpg',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'muhlenberg.png',
      file_name: 'muhlenberg.png',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
