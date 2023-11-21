const express = require("express");
const router = express.Router();
const favorites = require("../db/queries/favorites");

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  if (req.session.userId !== userId)
    return res
      .status(401)
      .json({ message: "You can only view your own favorites." });

  favorites
    .getFavoritesByUserId(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const { setId } = req.body;
  const userId = req.session.userId;
  if (!userId)
    return res.status(401).json({ message: "Login to favorite set" });

  favorites
    .addFavoriteByUserAndSet(userId, setId)
    .then(() => res.status(201).end());
});

router.put("/", (req, res) => {
  const { setId } = req.body;
  const userId = req.session.userId;
  if (!userId)
    return res
      .status(401)
      .json({ message: "Login to make changes to favorite set." });

  favorites
    .removeFavoriteByUserAndSet(userId, setId)
    .then(() => res.status(200).end());
});

module.exports = router;
