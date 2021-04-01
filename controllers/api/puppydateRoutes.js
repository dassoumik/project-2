const router = require('express').Router();
const session = require('express-session');
const {
  Op
} = require('sequelize');
const {
  User,
  Owner,
  Dog,
  PuppyDate,
  OwnerDate,
  DateList,
  DogDate
} = require('../../models');
const withAuth = require('../../utils/auth');

var {
  DateTime
} = require('luxon');



router.post('/', async (req, res) => {
  const ownerDateData = {};
  try {
    const dateData = await PuppyDate.create(req.body);
    if (!dateData) {
      res.status(400).json(err);
    } else {
      ownerDateData.owner1_id = dateData.dataValues.participant1_id;
      ownerDateData.owner2_id = dateData.dataValues.participant2_id;
      ownerDateData.date_id = dateData.dataValues.id;
    }
    await OwnerDate.create(ownerDateData);
    res.status(200).json(dateData);
  } catch (err) {
    err => console.error(err);
  }
});


router.post('/setdate', async (req, res) => {
  const dateInputData = {};
  const ownerDateData = {};
  const dogDateData = {};

  // console.log(req.body);
  try {
    const ownerId = await Owner.findOne({
      where: [{
        user_id: req.body.user_id
      }]
    });
    const dogId = await Dog.findOne({
      where: {
        [Op.and]: [{
          owner_id: ownerId.dataValues.id
        }, {
          name: req.body.dog2_name
        }]
      }
    });
    dateInputData.partcipant1_id = req.body.participant1_id;
    dateInputData.partcipant2_id = ownerId.dataValues.id;
    dateInputData.dog1_id = req.body.dog1_id;
    dateInputData.dog2_id = dogId.dataValues.id;
    dateInputData.date = req.body.date;
    dateInputData.time = req.body.time;
    dateInputData.location = req.body.location;
    dateInputData.zip = req.body.zip;
    // console.log(dateInputData);
    const dateData = await PuppyDate.create(dateInputData);
    if (!dateData) {
      res.status(400).json(err);
    } else {
      ownerDateData.owner1_id = dateData.dataValues.participant1_id;
      ownerDateData.owner2_id = dateData.dataValues.participant2_id;
      ownerDateData.date_id = dateData.dataValues.id;
      dogDateData.dog1_id = dateData.dataValues.dog1_id;
      dogDateData.dog2_id = dateData.dataValues.dog2_id;
      dogDateData.date_id = dateData.dataValues.id;
    }
    await OwnerDate.create(ownerDateData);
    await DogDate.create(dogDateData);
    // console.log(req.body.datelist_id);
    await DateList.destroy({
      where: {
        id: req.body.datelist_id
      }
    });
    res.status(200).json(dateData);
  } catch (err) {
    err => console.error(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const dateData = await PuppyDate.findAll({
      where: {
        participant1_id: req.params.id
      }
    }, {
      include: Owner
    });
    const dateData2 = await PuppyDate.findAll({
      where: {
        participant2_id: req.params.id
      }
    }, {
      include: [{
        all: true,
        nested: true
      }],
    });
    if (!dateData && !dateData2) {
      res
        .status(400)
        .json({
          message: 'Incorrect date, please try again'
        });
      return;
    } else {
      res
        .render('datepage', {
          date_data: dateData.datavalues,
          date_data2: dateData2.datavalues,
          logged_in: req.session.logged_in,
        });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/zip/search', async (req, res) => {
  res
    .render('datebyzip')
});


router.get('/zip/:id', async (req, res) => {
  try {
    const dateData = await PuppyDate.findAll({
      where: {
        location: req.params.id
      }
    }, {
      include: [{
        all: true,
        nested: true
      }],
    });
    if (!dateData) {
      res
        .status(400)
        .json({
          message: 'Incorrect date, please try again'
        });
      return;
    } else {
      res
        .render('datebyzip', {
          date_data: dateData.datavalues,
          logged_in: req.session.logged_in,
        });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/search/dates/zip/:id/:time', async (req, res) => {
  try {
    const dateData = await PuppyDate.findAll({
      where: {
        [Op.and]: [{
          location: req.params.id
        }, {
          time: {
            [Op.gt]: req.params.time
          }
        }]
      }
    });
    if (!dateData) {
      res
        .status(400)
        .json({
          message: 'Incorrect date, please try again'
        });
      return;
    } else {
      res
        .render('datebyzip', {
          date_data: dateData.datavalues,
          logged_in: req.session.logged_in,
        });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/today', async (req, res) => {
  const currentTime = DateTime.now().toISODate();
  try {
    const dateData = await PuppyDate.findAll({
        where: [{
          date: currentTime
        }]
      },

    );
    if (!dateData) {
      res
        .status(400)
        .json({
          message: 'Incorrect date, please try again'
        });
      return;
    } else {
      const simpleData = dateData.map((date) =>
        date.get({
          plain: true
        }));
      res
        .render('datesearch', {
          simpleData,
          logged_in: req.session.logged_in
        });

    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/list', async (req, res) => {
  try {
    const dateData = await DateList.findAll();

    if (!dateData) {
      res
        .status(400)
        .json({
          message: 'Incorrect date, please try again'
        });
      return;
    } else {
      const simpleData = dateData.map((date) =>
        date.get({
          plain: true
        }));
      res
        .render('datelist', {
          simpleData,
          user_id: req.session.user_id,
          logged_in: req.session.logged_in,
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/nexttwodays', async (req, res) => {
  const currentTime = DateTime.now().toISODate();
  const futureTime1 = new DateTime(currentTime).plus({
    days: 1
  }).toISODate();
  const futureTime2 = new DateTime(currentTime).plus({
    days: 2
  }).toISODate();

  try {
    const dateData = await PuppyDate.findAll({
      where: {
        [Op.or]: [{
          date: currentTime
        }, {
          date: futureTime1
        }, {
          date: futureTime2
        }]
      }
    }, {
      include: [{
        all: true,
        nested: true
      }],
    });
    if (!dateData) {
      res
        .status(400)
        .json({
          message: 'Incorrect date, please try again'
        });
      return;
    } else {
      const simpleTwoDayData = dateData.map((date) =>
        date.get({
          plain: true
        }));
      res
        .render('nexttwodays', {
          simpleTwoDayData,
          logged_in: req.session.logged_in,
        });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;