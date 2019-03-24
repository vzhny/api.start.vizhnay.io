exports.seed = knex => {
  return knex('categories')
    .del()
    .then(() => {
      return knex('categories').insert([{ name: 'Google' }, { name: 'Entertainment' }, { name: 'Education' }]);
    });
};
