const router = require('express').Router();
const session = require('express-session');
const { Op } = require('sequelize');
const { User, Owner, Dog, PuppyDate, OwnerDate } = require('../../models');
// const PuppyDate = require('../../models/PuppyDate');
var { DateTime } = require('luxon');


const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  const ownerDateData = {};
  try {
      console.log(req.body);
    const dateData = await PuppyDate.create(req.body);
    console.log(dateData);
    // .then(dateResponse, async () => {
      if (!dateData) {
          res.status(400).json(err);
      } else {
          ownerDateData.owner1_id = dateData.dataValues.participant1_id;
          ownerDateData.owner2_id = dateData.dataValues.participant2_id;
          ownerDateData.date_id = dateData.dataValues.id;
          }
          await OwnerDate.create(ownerDateData);
          res.status(200).json(dateData);
          // return dateData;
        } catch (err) {
          err => console.error(err);
        }
  
      }) ;
  // } catch (err) {
  //   res.status(400).json(err);
  // }
// });

router.get('/:id', async (req, res) => {
  try {
    const dateData = await PuppyDate.findAll({where: {participant1_id: req.params.id }},
     { 
      include: Owner
      // include: [{ model: 'owner', as: 'owner1Date' }],
  //    include: [{ model: 'owner', as: 'dateOwner' }],
      // include: [{ all: true, nested: true }],
   });
   const dateData2 = await PuppyDate.findAll({where: {participant2_id: req.params.id }},
    {
 //    include: [{ model: 'owner', as: 'dateOwner' }],
     include: [{ all: true, nested: true }],
  });
console.log(JSON.stringify(dateData, null, 2));
console.log(JSON.stringify(dateData2, null, 2));

    if (!dateData && !dateData2) {
      res
        .status(400)
        .json({ message: 'Incorrect date, please try again' });
      return;
    } else {
      //   const dateSimpleData = dateData.map((date) =>
      //    date.get({ plain: true }));
      //    console.log(dateSimpleData);
        res
          .render('datepage', {
              // owner_data: dateData.dateOwner.dataValues,
              date_data: dateData.datavalues,
              date_data2: dateData2.datavalues,
              logged_in: req.session.logged_in,
          });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/zip/:id', async (req, res) => {
  try {
    const dateData = await PuppyDate.findAll({where: {location: req.params.id }},
     {
  //    include: [{ model: 'owner', as: 'dateOwner' }],
      include: [{ all: true, nested: true }],
   });
  //  const dateData2 = await Date.findAll({where: {participant2_id: req.params.id }},
    // {
 //    include: [{ model: 'owner', as: 'dateOwner' }],
    //  include: [{ all: true, nested: true }],
  // });
console.log(dateData);
    if (!dateData) {
      res
        .status(400)
        .json({ message: 'Incorrect date, please try again' });
      return;
    } else {
      //   const dateSimpleData = dateData.map((date) =>
      //    date.get({ plain: true }));
      //    console.log(dateSimpleData);
        res
          .render('datebyzip', {
              // owner_data: dateData.dateOwner.dataValues,
              date_data: dateData.datavalues,
              // date_data2: dateData2.datavalues,
              logged_in: req.session.logged_in,
          });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// const currentTime = DateTime.now().toISODate();
// const futureTime1  = new DateTime(currentTime).plus({days: 1}).toISODate(); 
// const futureTime2  = new DateTime(currentTime).plus({days: 2}).toISODate(); 
// console.log(currentTime, futureTime1, futureTime2);

router.get('/search/today', async (req, res) => {
  console.log("in serach date");
  const currentTime = DateTime.now().toISODate();
  try {
    const dateData = await PuppyDate.findAll({where: [{date: currentTime }]},
    //  {
  //    include: [{ model: 'owner', as: 'dateOwner' }],
      // include: [{ all: true, nested: true }],
  //  }
   );
  //  const dateData2 = await Date.findAll({where: {participant2_id: req.params.id }},
    // {
 //    include: [{ model: 'owner', as: 'dateOwner' }],
    //  include: [{ all: true, nested: true }],
  // });
console.log(dateData);
// let dogs1 = [];
// let dogs2 = [];

// for(const dates in dateData) {
//   console.log(dates.dataValues.dog1_id);
// const dog1 = await Dog.findByPk(dates.dataValues.dog1_id, {include: Owner});
// const dog2 = await Dog.findByPk(dates.dataValues.dog2_id, {include: Owner});
// dogs1.push(JSON.stringify(dog1, null, 2));
// dogs2.push(JSON.stringify(dog2, null, 2));

// console.log(dog1, dog2);
// }     
//  { where: [{id: dateData[0].dataValues.id }] }
      // )
    if (!dateData) {
      res
        .status(400)
        .json({ message: 'Incorrect date, please try again' });
      return;
    } else {
      //   const dateSimpleData = dateData.map((date) =>
      //    date.get({ plain: true }));
      //    console.log(dateSimpleData);
      // const simpleDateData = JSON.stringify(dateData, null, 2);
      // simpleDateData = simpleDateData.map(data => data.get({plain: true}));
      const simpleData = dateData.map((date) =>
      date.get({ plain: true }));
      console.log("simple", ...simpleData);
        res
          .render('datesearch', {simpleData,
          // {
              // owner_data: dateData.dateOwner.dataValues,
              
              // simpleDateData,
              // date_data2: dateData2.datavalues,
              logged_in: req.session.logged_in
          });
    // }

}} catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/nexttwodays', async (req, res) => {
  // const sessionDateToday = new Date.now();
  const currentTime = DateTime.now().toISODate();
const futureTime1  = new DateTime(currentTime).plus({days: 1}).toISODate(); 
const futureTime2  = new DateTime(currentTime).plus({days: 2}).toISODate(); 
console.log(futureTime1, futureTime2);

  try {
    const dateData = await PuppyDate.findAll({where:  { [Op.or]: [{date: currentTime}, {date: futureTime1}, {date: futureTime2}]}},
     {
  //    include: [{ model: 'owner', as: 'dateOwner' }],
      include: [{ all: true, nested: true }],
   });
  //  const dateData2 = await PuppyDate.findAll({where: {participant2_id: req.params.id }},
    // {
 //    include: [{ model: 'owner', as: 'dateOwner' }],
    //  include: [{ all: true, nested: true }],
  // });
console.log(dateData);
    if (!dateData) {
      res
        .status(400)
        .json({ message: 'Incorrect date, please try again' });
      return;
    } else {
      //   const dateSimpleData = dateData.map((date) =>
      //    date.get({ plain: true }));
      //    console.log(dateSimpleData);
        res
          .render('datebyzip', {
              // owner_data: dateData.dateOwner.dataValues,
              date_data: dateData.datavalues,
              // date_data2: dateData2.datavalues,
              logged_in: req.session.logged_in,
          });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;