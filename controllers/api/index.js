const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ownerRoutes = require("./ownerRoutes");
const dogRoutes = require("./dogRoutes");
const dateRoutes = require("./dateRoutes");




router.use("/users", userRoutes);
router.use("/owners", ownerRoutes);
router.use("/dogs", dogRoutes);
router.use("/dates", dateRoutes);




module.exports = router;
