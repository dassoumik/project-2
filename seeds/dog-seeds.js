
const { Dog } = require('../models');

const dogData = [
  {
    name: 'Samb Johnson',
    breed: 'Aussiepom',
    age: 6,
    gender: 'Female',
    image: 'https://www.dogtime.com/assets/uploads/2019/07/aussiepom-mixed-dog-breed-pictures-cover-650x368.jpg',
    owner_id: 1,
  },
  {
    name: 'Melon Wallace',
    breed: 'Beabull',
    age: 5,
    gender: 'Female',
    image: 'https://www.dogtime.com/assets/uploads/2019/12/beabull-mixed-dog-breed-pictures-cover-650x368.jpg',
    owner_id: 2,
  },
  {
    name: 'Tam Vivan',
    breed: 'Cavapo',
    age: 3,
    gender: 'Male',
    image: 'https://www.dogtime.com/assets/uploads/2019/08/cavapoo-mixed-dog-breed-pictures-cover-650x368.jpg',
    owner_id: 3,
  },
  {
    name: 'Drake Gyam',
    breed: 'German Shepherd',
    age: 8,
    gender: 'Male',
    image: 'https://www.dogtime.com/assets/uploads/2011/01/file_23188_german-shepherd-dog-300x189.jpg',
    owner_id: 4,
  },
  {
    name: 'Gollie Vivan',
    breed: 'Morkie',
    age: 7,
    gender: 'Female',
    image: 'https://www.dogtime.com/assets/uploads/2019/07/morkie-mixed-dog-breed-pictures-cover-650x368.jpg',
    owner_id: 5,
  },
];

const seedDog = () => Dog.bulkCreate(dogData);
module.exports = seedDog;

