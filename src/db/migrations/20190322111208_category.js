exports.up = knex => {
  return knex.schema.createTable('categories', table => {
    table.increments('id');
    table.string('name', 24).notNullable();
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNullable();

    table.unique('name');
  });
};

exports.down = knex => knex.schema.dropTable('categories');
