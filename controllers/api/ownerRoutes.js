const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  try {
    const userData = await Owner.create(req.body);
    res.status(200).json(userData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await Owner.findByPk(req.params.id, { include: Dog });
      // include: [{ model: 'user', as: 'userOwner' }],
     // include: [{ all: true, nested: true }],
    //});
    console.log(JSON.stringify(userData, null, 2));

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect owner, please try again' });
      return;
    } else {
      //   const ownerData = userData.map((owner) =>
      //  owner.get({ plain: true }));
        res
          .render('owner', {
              owner_data: userData.dataValues,
              logged_in: req.session.logged_in,
          });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
