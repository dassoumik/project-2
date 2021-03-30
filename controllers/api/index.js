const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ownerRoutes = require("./ownerRoutes");
const dogRoutes = require("./dogRoutes");
const puppydateRoutes = require("./puppydateRoutes");




router.use("/users", userRoutes);
router.use("/owners", ownerRoutes);
router.use("/dogs", dogRoutes);
router.use("/puppydates", puppydateRoutes);




module.exports = router;
