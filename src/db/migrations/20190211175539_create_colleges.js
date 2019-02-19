exports.up = function(knex, Promise) {
  return knex.schema.createTable('colleges', table => {
    table.increments('id').unsigned().primary()
    table.string('name')
    table.string('state')
    table.string('city')
    table.string('phone')
    table.string('website')
    table.string('schedule')
    table.integer('logo_id').unsigned()
    table.foreign('logo_id').references('assets.id')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('colleges')
}
