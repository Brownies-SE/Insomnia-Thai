const router = require("express").Router();
const { User, Order, Reservation } = require("../../models");

//Create a new Order
router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create({
      contents: req.body.contents,
      price: req.body.price,
      date_created: new Date(),
      user_id: req.session.user_id,
    });
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
  // if (req.session.loggedIn) {
  //   req.body.user_id = req.session.user_id;
  //   const data = await Order.create(req.body);
  //   res.json(data);
  // } else {
  //   res.redirect("/login");
  // }
});

//get all orders for logged in user and render
router.get("/renderOrd", async (req, res) => {
  try {
    const data = await Order.findAll({
      where: { user_id: req.session.user_id },
    });
    const allOrderData = data.map((dataSet) => dataSet.get({ plain: true }));
    console.log(allOrderData);
    res.render("allOrderData", {
      allOrderData,
      loggedIn: req.session.loggedIn,
    });
    // res.status(200).json(allOrderData);
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
