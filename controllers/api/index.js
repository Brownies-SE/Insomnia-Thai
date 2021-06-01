const router = require("express").Router();
const userRoutes = require("./userRoutes");
const reservationRoutes = require("./reservationRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/users", userRoutes);
router.use("/reservations", reservationRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
