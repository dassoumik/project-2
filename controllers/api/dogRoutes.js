const router = require('express').Router();
const session = require('express-session');
const {
  User,
  Owner,
  Dog,
  OwnerDog
} = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/create/new/profile', withAuth, async (req, res) => {
  const dogInput = {};
  try {
    const ownerId = await Owner.findOne({
      where: [{
        user_id: req.body.user_id
      }]
    });
    console.log(ownerId);
    dogInput.name = req.body.name;
    dogInput.breed = req.body.breed;
    dogInput.age = req.body.age;
    dogInput.gender = req.body.gender;
    dogInput.image = req.body.image;
    dogInput.owner_id = ownerId.dataValues.id;
    console.log(dogInput);

    const dogData = await Dog.create(dogInput);
    if (!dogData) {
      res.status(400).json(err);
    } else {
      const inputOwnerDog = {};
      inputOwnerDog.owner_id = dogData.dataValues.owner_id;
      inputOwnerDog.dog_id = dogData.dataValues.id;


      const ownerDogData = await OwnerDog.create(inputOwnerDog);
      if (!ownerDogData) {
        res.status(400).json(err);
      } else {
       res.status(200).json(dogData);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const dogData = await Dog.findByPk(req.params.id, {
      include: Owner
    });
    if (!dogData) {
      res
        .status(400)
        .json({
          message: 'Incorrect dog, please try again'
        });
      return;
    } else {
      const simpleDogData = dogData.get({
        plain: true
      });
      res
        .render('dogpage', {
          // owner_data: dogData.dogOwner.dataValues,
          simpleDogData,
          logged_in: req.session.logged_in,
        });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/profile/add', withAuth, async (req, res) => {
  try {
    res
      .render('dogprofileupdate', {
        user_id: req.session.user_id,
        logged_in: req.session.logged_in,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;