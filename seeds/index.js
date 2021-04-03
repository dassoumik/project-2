const seedUser = require('./user-seeds');
const seedOwner = require('./owner-seeds');
const seedDog = require('./dog-seeds');
const seedOwnerDog = require('./owner-dog-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedOwner();
  console.log('\n----- OWNERS SEEDED -----\n');

  await seedDog();
  console.log('\n----- DOGS SEEDED -----\n');

  await seedOwnerDog();
  console.log('\n----- OWNER DOG SEEDED -----\n');

  process.exit(0);
};

seedAll();