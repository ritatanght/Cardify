const router = require("express").Router();
const users = require("../db/queries/users");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  users.getUserByEmail(email).then((user) => {
    if (!user) return res.json({ message: "User not found" });

    bcrypt.compare(password, user.hashed_password, (err, result) => {
      // return the userObject when the password is correct
      if (result) {
        // set the cookie
        req.session.userId = user.id;
        return res.json({
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        });
      }

      if (err) {
        return res.json({ message: err });
      }

      return res.json({ message: "Login details are incorrect." });
    });
  });
});

module.exports = router;
