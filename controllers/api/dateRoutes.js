const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog, Date } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  try {
      console.log(req.body);
    const dateData = await Date.create(req.body).then(dateResponse, async () => {
      if (!dateResponse) {
          res.status(400).json(err);
      } else {
          ownerDateData = {
              owner1_id: dateResponse.participant1_id,
              owner2_id: dateResponse.participant2_id,
              date_id: dateResponse.id
          }
          await OwnerDog.create(ownerDogData);
          return dateResponse;
      }
  });;
    res.status(200).json(dateData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;