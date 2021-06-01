const router = require("express").Router();
const { User } = require("../../models");

//Get all users

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findbyPK(req.params.id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });

    //log in the new user
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Update User Info (lookup by ID)
router.put("/:id", async (req, res) => {
  try {
    const updatedUserData = await User.update(
      {
        email: req.body.email,
        phone: req.body.phone,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
