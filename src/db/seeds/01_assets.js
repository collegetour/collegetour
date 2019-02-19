const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assets').del()

  await knex('assets').insert([
    {
      original_file_name: 'boston.png',
      file_name: 'boston.png',
      content_type: 'image/png',
      file_size: 117939,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'brown.png',
      file_name: 'brown.png',
      content_type: 'image/png',
      file_size: 170887,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'cornell.png',
      file_name: 'cornell.png',
      content_type: 'image/png',
      file_size: 30483,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'dickenson.png',
      file_name: 'dickenson.png',
      content_type: 'image/png',
      file_size: 10334,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'drexel.png',
      file_name: 'drexel.png',
      content_type: 'image/png',
      file_size: 76861,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'haverford.jpg',
      file_name: 'haverford.jpg',
      content_type: 'image/jpeg',
      file_size: 9650,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'swarthmore.png',
      file_name: 'swarthmore.png',
      content_type: 'image/png',
      file_size: 68547,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'upen.png',
      file_name: 'upen.png',
      content_type: 'image/png',
      file_size: 196379,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'vassar.png',
      file_name: 'vassar.png',
      content_type: 'image/png',
      file_size: 65739,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'villanova.png',
      file_name: 'villanova.png',
      content_type: 'image/png',
      file_size: 107412,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'wesleyan.png',
      file_name: 'wesleyan.png',
      content_type: 'image/png',
      file_size: 220234,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'greg.jpg',
      file_name: 'greg.jpg',
      content_type: 'image/jpeg',
      file_size: 18324,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    },
    {
      original_file_name: 'muhlenberg.png',
      file_name: 'muhlenberg.png',
      content_type: 'image/png',
      file_size: 25507,
      chunks_total: 1,
      status: 'assembled',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
