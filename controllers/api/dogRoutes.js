const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog, OwnerDog } = require('../../models');
// const OwnerDog = require('../../models/OwnerDog');
const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  const ownerDogData = {};
  try {
    const dogData = await Dog.create(req.body)
    // .then(dogResponse, async () => {
        console.log(dogData, dogData.dataValues.owner_id, dogData.dataValues.id);
        if (!dogData) {
            res.status(400).json(err);
        } else {
            ownerDogData.owner_id = dogData.dataValues.owner_id;
            ownerDogData.dog_id = dogData.dataValues.id;
            }
            await OwnerDog.create(ownerDogData);
            console.log(ownerDogData);
            // return dogResponse;
        // }
    // });
    res.status(200).json(dogData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const dogData = await Dog.findByPk(req.params.id,
       {
    //    include: [{ model: 'owner', as: 'dogOwner' }],
        include: [{ all: true, nested: true }],
     });
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
          res
            .render('dogpage', {
                // owner_data: dogData.dogOwner.dataValues,
                dog_data: dogData.datavalues,
                logged_in: req.session.logged_in,
            });
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;