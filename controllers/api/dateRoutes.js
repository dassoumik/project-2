const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog, Date, OwnerDate } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  const ownerDateData = {};
  try {
      console.log(req.body);
    const dateData = await Date.create(req.body)
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

module.exports = router;