const router = require("express").Router();
const orderRoutes = require("./orderRoutes");

router.use("/orders", orderRoutes);

module.exports = router;
