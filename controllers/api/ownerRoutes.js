const router = require('express').Router();
const session = require('express-session');
const {
  User,
  Owner,
  Dog,
  DateList
} = require('../../models');
const {
  Op
} = require('sequelize');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const userData = await Owner.create(req.body);
    res.status(200).json(userData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/list', withAuth, async (req, res) => {
  try {
    const ownerId = await Owner.findOne({
      where: [{
        user_id: req.body.userID
      }]
    }, {
      attributes: {
        include: ['id']
      }
    });
    const dogId = await Dog.findOne({
      where: {
        [Op.and]: [{
          owner_id: ownerId.dataValues.id
        }, {
          name: req.body.name
        }]
      }
    });
    const listInput = {};
    listInput.participant1_id = ownerId.dataValues.id;
    listInput.dog1_id = dogId.dataValues.id;
    listInput.date = req.body.selectedDate;
    listInput.time = req.body.selectedTime;
    listInput.location = req.body.location;
    listInput.zip = req.body.zip;
    console.log(listInput);
    const userData = await DateList.create(listInput);
    console.log(userData);
    res.status(200).json(userData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/listform', withAuth, async (req, res) => {
  try {
    await res.render('DateListForm', {
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/profile/add', withAuth, async (req, res) => {
  try {
    const userData = await Owner.create(req.body);
    res.status(200).json(userData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/profile/add', withAuth, async (req, res) => {
  try {

    await res.render('profileupdate', {
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await Owner.findByPk(req.params.id, {
      include: Dog
    });
    if (!userData) {
      res
        .status(400)
        .json({
          message: 'Incorrect owner, please try again'
        });
      return;
    } else {
      const simpleOwnerData = userData.get({
        plain: true
      });
      res
        .render('owner', {
          simpleOwnerData,
          logged_in: req.session.logged_in,
        });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/zip/:id', withAuth, async (req, res) => {
  console.log("in zip/id")
  try {
    const ownerData = await Owner.findAll({
      where: {
        zip: req.params.id
      }
    }, {
      include: [{
        all: true,
        nested: true
      }],
    });
    if (!ownerData) {
      res
        .status(400)
        .json({
          message: 'Incorrect data, please try again'
        });
      return;
    } else {
      console.log(ownerData);
      const simpleData = ownerData.map((date) =>
        date.get({
          plain: true
        }));
      res.status(200).json(simpleData);
        // .render('datebyzip', {
        //   date_data: ownerData.datavalues,
        //   logged_in: req.session.logged_in,
        // });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;