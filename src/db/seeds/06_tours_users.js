exports.seed = async (knex, Promise) => {

  await knex('tours_users').del()

  await knex('tours_users').insert([
    {
      tour_id: 1,
      user_id: 1
    },
    {
      tour_id: 1,
      user_id: 2
    },
    {
      tour_id: 1,
      user_id: 3
    },
    {
      tour_id: 1,
      user_id: 4
    }
  ])

}
