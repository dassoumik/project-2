const { OwnerDog } = require('../models');


const OwnerDogData = [
    {
      owner_id: 1,
      dog_id: 1,
    },
    {
      owner_id: 2,
      dog_id: 2,
    },
    {
      owner_id: 3,
      dog_id: 3,
    },
    {
      owner_id: 4,
      dog_id: 4,
    },
    {
      owner_id: 5,
      dog_id: 5,
    },
  ];
  
  const seedOwnerDog = () => OwnerDog.bulkCreate(OwnerDogData);

module.exports = seedOwnerDog;

