const router = require("express").Router();
const { User, Order, Reservation } = require("../../models");

//Create a new Order
router.post("/", async (req, res) => {
  if (req.session.loggedIn) {
    req.body.user_id = req.session.user_id;
    const data = await Order.create(req.body);
    res.json(data);
  } else {
    res.redirect("/login");
  }
});

//get all user orders
router.get("/", async (req, res) => {
  try {
    const data = await Order.findAll({
      where: { user_id: req.session.user_id },
    });
    const allData = data.map((dataSet) => dataSet.get({ plain: true }));
    // res.render("allData", {
    //   allData,
    //   loggedIn: req.session.loggedIn,
    // });
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update order
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.update(
      {
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedOrder) {
      res.status(404).json({ message: "No Order with that ID!" });
      return;
    }
    res.status(200).json("Order Updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteOrder = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteOrder) {
      res.status(404).json({ message: "No Order with that ID!" });
      return;
    }
    res.status(200).json(" Order was deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
