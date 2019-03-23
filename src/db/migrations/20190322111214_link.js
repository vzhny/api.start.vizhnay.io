exports.up = knex => {
  return knex.schema.createTable('links', table => {
    table.increments('id');
    table.string('url').notNullable();
    table.string('title', 16).notNullable();
    table
      .string('owner')
      .references('userId')
      .inTable('users')
      .notNullable();
    table
      .integer('category')
      .references('id')
      .inTable('categories')
      .notNullable();
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNullable();

    table.unique('url');
  });
};

exports.down = knex => knex.schema.dropTable('links');
