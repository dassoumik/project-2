const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog, OwnerDog } = require('../../models');
// const OwnerDog = require('../../models/OwnerDog');
const withAuth = require('../../utils/auth');


router.post('/create/new/profile',  async (req, res) => {
  const dogInput = {};
  try {
    const ownerId = await Owner.findOne({where: [{user_id: req.body.user_id}]});
    console.log(ownerId);
    dogInput.name = req.body.name;
    dogInput.breed = req.body.breed;
    dogInput.age = req.body.age;
    dogInput.gender = req.body.gender;
    dogInput.image = req.body.image;
    dogInput.owner_id = ownerId.dataValues.id;
    console.log(dogInput);

    const dogData = await Dog.create(dogInput);
        // console.log(dogData, dogData.dataValues.owner_id, dogData.dataValues.id);
        if (!dogData) {
            res.status(400).json(err);
        } else {
            // console.log(ownerDogData);
            res.status(200).json(dogData);
        }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  console.log("in dog route id");
    try {
      const dogData = await Dog.findByPk(req.params.id,
       { include: Owner});
      //  include: [{ model: 'owner', as: 'OwnerDog' }, { model: OwnerDog, as: 'dogOwner' }],
        // include: [{ all: true, nested: true }],
    //  });
  console.log(dogData);
      if (!dogData) {
        res
          .status(400)
          .json({ message: 'Incorrect dog, please try again' });
        return;
      } else {
        //   const dogSimpleData = dogData.map((dog) =>
        //    dog.get({ plain: true }));
        //    console.log(dogSimpleData);
        const simpleDogData = dogData.get({ plain: true });
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
  router.get('/profile/add', async (req, res) => {
    console.log("in dog route id");
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

    // router.post('/profile/add', async (req, res) => {
    //   console.log("in dog route id");
    //     try {
    //       const 
    //                   res
    //             .render('dogprofileupdate', {
    //                 user_id: req.session.user_id,
    //                 logged_in: req.session.logged_in,
    //             });
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //   });
  

module.exports = router;