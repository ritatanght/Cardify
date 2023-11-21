const router = require("express").Router();
const users = require("../db/queries/users");
const bcrypt = require("bcrypt");

// User accesses the profile page
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (req.session.userId !== id)
    return res
      .status(401)
      .json({ message: "You can only view your own details." });
  users
    .getUserUsername(id)
    .then((data) => {
      data
        ? res.json(data)
        : res.status(404).json({ message: "User not found" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    });
});

// Register a new user
router.post("/", (req, res) => {
  const { email, username, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      users
        .createUser(email, username, hash)
        .then((user) => {
          req.session.userId = user.id;
          return res.json(user);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Unable to create user" });
        });
    });
  });
});

module.exports = router;
