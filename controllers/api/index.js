const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ownerRoutes = require("./ownerRoutes");
const dogRoutes = require("./dogRoutes");



router.use("/users", userRoutes);
router.use("/owners", ownerRoutes);
router.use("/dogs", dogRoutes);



module.exports = router;
