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

module.exports = router;