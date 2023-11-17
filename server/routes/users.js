const router = require("express").Router();
const users = require("../db/queries/users");
const bcrypt = require("bcrypt");

router.get("/:id", (req, res) => {
  const { id } = req.params;

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

router.post("/", (req, res) => {
  const { email, username, password } = req.body;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      users
        .createUser(email, username, hash)
        .then((data) => res.json(data))
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Unable to create user" });
        });
    });
  });
});

module.exports = router;
