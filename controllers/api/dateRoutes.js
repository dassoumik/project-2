const router = require('express').Router();
const session = require('express-session');
const { User, Owner, Dog, Date } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/',  async (req, res) => {
  try {
      console.log(req.body);
    const dateData = await Date.create(req.body);
    res.status(200).json(dateData);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;