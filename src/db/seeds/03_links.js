exports.seed = knex => {
  return knex('links')
    .del()
    .then(() => {
      return knex('links').insert([
        { linkId: '8bgqqjUrG', url: 'https://google.com', title: 'Google', category: 1, owner: '2FIOCbin6' },
        { linkId: 'iU9MAYeN3A', url: 'https://netflix.com', title: 'Netflix', category: 2, owner: '2FIOCbin6' },
        { linkId: 'XIe7pPTF8P', url: 'https://udemy.com', title: 'Udemy', category: 3, owner: 'CCmZIfpYI5' },
        { linkId: '9mbuX5R7ZD', url: 'https://hulu.com', title: 'Hulu', category: 2, owner: 'CCmZIfpYI5' },
      ]);
    });
};
