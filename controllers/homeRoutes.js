const router = require("express").Router();
const { Project, User, Owner } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:zip",  async (req, res) => {
  console.log(req.params.zip);
  const nearByUsers = await Owner.findAll({where: {zip: req.params.zip}}, {include: {model: 'user', as: 'owner'}});
  const users = nearByUsers.map((user) => user.get({ plain: true }));
  if (nearByUsers)
  {
    res.status(200).json(users);
  }
  // try {
  //   res.render("homepage", {
  //     user: users,
  //     logged_in: req.session.logged_in,
    // });
  // } catch (err) {
    // res.status(500).json(err);
  // }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
