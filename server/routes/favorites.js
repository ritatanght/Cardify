const express = require("express");
const router = express.Router();
const favorites = require("../db/queries/favorites");

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  favorites.getFavoritesByUserId(userId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.log(err)
    });
});

router.post("/", (req, res) => {
  const { userId, setId } = req.body;

  favorites
    .addFavoriteByUserAndSet(userId, setId)
    .then(() => res.status(201).end());
});

router.put("/", (req, res) => {
  const { userId, setId } = req.body;

  favorites
    .removeFavoriteByUserAndSet(userId, setId)
    .then(() => res.status(200).end());
});

module.exports = router;
