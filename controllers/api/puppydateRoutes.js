const router = require('express').Router();
const session = require('express-session');
const { Op } = require('sequelize');
const { User, Owner, PuppyDate, OwnerDate } = require('../../models');
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
  //    include: [{ model: 'owner', as: 'dateOwner' }],
      include: [{ all: true, nested: true }],
   });
   const dateData2 = await PuppyDate.findAll({where: {participant2_id: req.params.id }},
    {
 //    include: [{ model: 'owner', as: 'dateOwner' }],
     include: [{ all: true, nested: true }],
  });
console.log(dateData);
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

const currentTime = DateTime.now().toISODate();
const futureTime1  = DateTime.now().plus(1, 'days').toISODate(); 
const futureTime2  = DateTime.now().plus(2, 'days').toISODate(); 

router.get('/search', async (req, res) => {
  try {
    const dateData = await PuppyDate.findAll({where: {date: currentTime }},
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

router.get('/search/nexttwodays', async (req, res) => {
  // const sessionDateToday = new Date.now();
  try {
    const dateData = await PuppyDate.findAll({where:  { [Op.or]: [{date: {currentTime}}, {date: {futureTime1}}, {date: {futureTime2}}]}},
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