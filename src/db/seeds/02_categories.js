exports.seed = knex =>
  knex('categories')
    .del()
    .then(() => knex('categories').insert([{ name: 'Google' }, { name: 'Entertainment' }, { name: 'Education' }]));
