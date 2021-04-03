const { Owner } = require('../models');

const ownerData = [
  {
    name: 'Timothy Johnson',
    city: 'Atlanta',
    state: 'GA',
    zip: '30346',
    dob: 01/01/2000,
    gender: 'Female',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdBK5DXQZVEzU5NxjDJTSTlOF1zsjFf_TFHnGZdV6DY25GcRl7SnvBr86yEtT442RAbs&usqp=CAU',
    user_id: 1,
  },
  {
    name: 'Smith Wallace',
    city: 'Atlanta',
    state: 'GA',
    zip: '30346',
    dob: 01/01/1995,
    gender: 'Female',
    image: 'https://st.depositphotos.com/1491329/3629/i/600/depositphotos_36297389-stock-photo-beauty-portrait-beautiful-spa-woman.jpg',
    user_id: 2,
  },
  {
    name: 'Rogers Vivan',
    city: 'Atlanta',
    state: 'GA',
    zip: '30346',
    dob: 01/01/1996,
    gender: 'Male',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    user_id: 3,
  },
  {
    name: 'Durian Gyam',
    city: 'Atlanta',
    state: 'GA',
    zip: '30346',
    dob: 01/01/1997,
    gender: 'Male',
    image: 'https://st.depositphotos.com/1491329/3629/i/600/depositphotos_36297389-stock-photo-beauty-portrait-beautiful-spa-woman.jpg',
    user_id: 4,
  },
  {
    name: 'Alen Vivan',
    city: 'Atlanta',
    state: 'GA',
    zip: '30346',
    dob: 01/01/1998,
    gender: 'Female',
    image: 'https://www.menshairstylestoday.com/wp-content/uploads/2018/10/Best-Haircut-For-Oblong-Face-Men.jpg',
    user_id: 5,
  },
];

const seedOwner = () => Owner.bulkCreate(ownerData);
module.exports = seedOwner;


