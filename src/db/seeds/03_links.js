exports.seed = knex => {
  return knex('links')
    .del()
    .then(() => {
      return knex('links').insert([
        { url: 'https://google.com', name: 'Google', category: 1, owner: '2FIOCbin6' },
        { url: 'https://netflix.com', name: 'Netflix', category: 2, owner: '2FIOCbin6' },
        { url: 'https://udemy.com', name: 'Udemy', category: 3, owner: 'CCmZIfpYI5' },
        { url: 'https://hulu.com', name: 'Hulu', category: 2, owner: 'CCmZIfpYI5' },
      ]);
    });
};
