exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').unsigned().primary()
    table.string('first_name')
    table.string('last_name')
    table.integer('photo_id').unsigned()
    table.foreign('photo_id').references('assets.id')
    table.string('instagram_id')
    table.string('facebook_id')
    table.string('google_id')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
