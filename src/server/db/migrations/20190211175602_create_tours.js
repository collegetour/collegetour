exports.up = function(knex, Promise) {
  return knex.schema.createTable('tours', table => {
    table.increments('id').unsigned().primary()
    table.integer('owner_id').unsigned()
    table.foreign('owner_id').references('users.id')
    table.string('name')
    table.date('start_date')
    table.date('end_date')
    table.string('origin')
    table.string('destination')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tours')
}
