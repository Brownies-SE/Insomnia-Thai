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
    const userData = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });

    //log in the new user
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
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
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
