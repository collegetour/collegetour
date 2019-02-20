exports.up = function(knex, Promise) {
  return knex.schema.createTable('impressions', table => {
    table.increments('id').unsigned().primary()
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
    table.integer('visit_id').unsigned()
    table.foreign('visit_id').references('visits.id')
    table.integer('asset_id').unsigned()
    table.foreign('asset_id').references('assets.id')
    table.enum('type', ['photo','note','review'])
    table.text('text')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('impressions')
}
