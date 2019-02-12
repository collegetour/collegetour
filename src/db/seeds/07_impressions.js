exports.seed = async (knex, Promise) => {

  await knex('impressions').del()

  await knex('impressions').insert([])

}
