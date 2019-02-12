exports.up = function(knex, Promise) {
  return knex.schema.createTable('tours_users', table => {
    table.integer('tour_id').unsigned()
    table.foreign('tour_id').references('tours.id')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tours_users')
}
