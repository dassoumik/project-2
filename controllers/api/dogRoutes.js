const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  try {
    const dogData = await Dog.create(req.body);
    res.status(200).json(dogData);
    
  } catch (err) {
    res.status(400).json(err);
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
                owner_data: dog.dogOwner.dataValues,
                dog_data: dog.datavalues,
                logged_in: req.session.logged_in,
            });
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;