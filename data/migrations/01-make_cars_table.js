exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', tbl=>{
    tbl.increments() //auto increment ID
    tbl.varchar('vin', 128).unique().notNullable()
    tbl.varchar('make', 128).notNullable()
    tbl.varchar('model', 128).notNullable()
    tbl.decimal('mileage').notNullable()
    tbl.varchar('title',128)
    tbl.varchar('transmission')
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};
