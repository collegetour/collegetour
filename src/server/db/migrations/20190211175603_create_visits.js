exports.up = function(knex, Promise) {
  return knex.schema.createTable('visits', table => {
    table.increments('id').unsigned().primary()
    table.integer('tour_id').unsigned()
    table.foreign('tour_id').references('tours.id')
    table.integer('college_id').unsigned()
    table.foreign('college_id').references('colleges.id')
    table.integer('delta')
    table.date('date')
    table.time('info_session')
    table.time('campus_tour')
    table.string('weather')
    table.integer('temp')
    table.integer('drive_duration')
    table.integer('drive_distance')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('visits')
}
