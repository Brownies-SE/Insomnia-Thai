const router = require("express").Router();
const { User, Order, Reservation } = require("../models");

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

//login post
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

router.get("/signup", (req, res) => {
  res.render("/signup");
});

router.get("/reservations", (req, res) => {
  res.render("reservation");
});

router.get("/", async (req, res) => {
  console.log(req.session.loggedIn);
  res.render("insomnia", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/takeout", (req, res) => {
  res.render("takeout");
});

module.exports = router;
