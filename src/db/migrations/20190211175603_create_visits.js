exports.up = function(knex, Promise) {
  return knex.schema.createTable('visits', table => {
    table.increments('id').unsigned().primary()
    table.integer('tour_id').unsigned()
    table.foreign('tour_id').references('tours.id')
    table.integer('college_id').unsigned()
    table.foreign('college_id').references('colleges.id')
    table.integer('delta')
    table.time('info_session')
    table.time('college_tour')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('visits')
}
