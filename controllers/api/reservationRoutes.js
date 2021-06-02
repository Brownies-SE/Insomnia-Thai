const router = require("express").Router();
const { Reservation, User } = require("../../models");

//get all reservations

// router.get("/", async (req, res) => {
//   try {
//     const resData = await Reservation.findAll();
//     res.status(200).json(resData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get all reservations

router.get("/", async (req, res) => {
  try {
    const resData = await Reservation.findAll({
      where: { user_id: req.session.user_id },
    });
    res.status(200).json(resData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get reservations by id, Associated User Data included

router.get("/:id", async (req, res) => {
  try {
    const resData = await Reservation.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["id", "name", "email", "phone"] }],
    });
    if (!resData) {
      res.status(404).json({ message: "No reservation found with this id!" });
      return;
    }
    res.status(200).json(resData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add new reservation
router.post("/", async (req, res) => {
  try {
    const newRes = await Reservation.create({
      phone: req.body.phone,
      time: req.body.time,
      people: req.body.people,
      message: req.body.message,
      date_of_res: req.body.date_of_res,
      user_id: req.session.user_id,
    });
    res.status(200).json(newRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a Reservation
router.delete("/:id", async (req, res) => {
  try {
    const delRes = await Reservation.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!delRes) {
      res.status(404).json({ message: "No reservation found with this id!" });
      return;
    }
    res.status(200).json(delRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
