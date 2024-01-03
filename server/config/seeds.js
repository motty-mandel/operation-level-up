const db = require('./connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');

  await User.create({
    userName: 'magerm',
    email: 'magerm@testmail.com',
    password: 'password12345',
  });

  await User.create({
    userName: 'call.of.gaza',
    email: 'cOg@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
