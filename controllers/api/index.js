const router = require("express").Router();

const userRoutes = require("./userRoutes");
const reservationRoutes = require("./reservationRoutes");
const orderRoutes = require("./orderRoutes");
const sendMail = require("./sendgrid");

router.use("/users", userRoutes);
router.use("/reservations", reservationRoutes);

router.use("/orders", orderRoutes);
router.use("/sendgrid", sendMail);

module.exports = router;
