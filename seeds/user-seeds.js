const { User } = require('../models');

const userData = [
  {
    user_name: 'timothy',
    email: 'timothy@email.com',
    password: '**********',
  },
  {
    user_name: 'smith',
    email: 'smith@email.com',
    password: '**********',  
  },
  {
    user_name: 'rogers',
    email: 'rogers@email.com',
    password: '**********',  
  },
  {
    user_name: 'durian',
    email: 'durian@email.com',
    password: '**********',  
  },
  {
    user_name: 'alen',
    email: 'alen@email.com',
    password: '**********'  
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

