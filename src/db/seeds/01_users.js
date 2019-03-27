import bcrypt from 'bcryptjs';

exports.seed = knex =>
  knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          userId: '2FIOCbin6',
          email: 'jake@bk99.gov',
          password: bcrypt.hashSync('i_luv_amy', 10),
        },
        {
          userId: 'CCmZIfpYI5',
          email: 'amy@bk99.gov',
          password: bcrypt.hashSync('I_love_Jake', 10),
        },
      ])
    );
