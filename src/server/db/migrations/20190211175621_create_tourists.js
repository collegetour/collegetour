exports.up = function(knex, Promise) {
  return knex.schema.createTable('tourists', table => {
    table.increments('id').primary()
    table.integer('tour_id').unsigned()
    table.foreign('tour_id').references('tours.id')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
    table.timestamp('claimed_at')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tourists')
}
