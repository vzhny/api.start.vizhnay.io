exports.seed = knex => {
  return knex('links')
    .del()
    .then(() => {
      return knex('links').insert([
        { url: 'https://google.com', title: 'Google', category: 1, owner: '2FIOCbin6' },
        { url: 'https://netflix.com', title: 'Netflix', category: 2, owner: '2FIOCbin6' },
        { url: 'https://udemy.com', title: 'Udemy', category: 3, owner: 'CCmZIfpYI5' },
        { url: 'https://hulu.com', title: 'Hulu', category: 2, owner: 'CCmZIfpYI5' },
      ]);
    });
};
