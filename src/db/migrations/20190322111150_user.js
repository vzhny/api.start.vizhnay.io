exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('userId').notNullable();
    table.string('email', 32).notNullable();
    table.string('password').notNullable();
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNullable();

    table.unique('userId');
    table.unique('email');
  });
};

exports.down = knex => knex.schema.dropTable('users');
