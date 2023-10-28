const router = require('express').Router();
const sets = require("../db/queries/sets")
const cards = require("../db/queries/cards");

router.post('/create', (req, res) => {
  sets.postSetData(req.body)
    .then(result => {
      res.status(201).json({ success: true, message: "Set created successfully", data: result });
    })
    .catch(err => {
      res.status(500)
      console.error(err)
    })
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  const setPromise = sets.getSetInfoById(id);
  const cardsPromise = cards.getCardsBySetId(id);

  Promise.all([setPromise, cardsPromise]).then(([set, cards]) => {
    res.json({ set, cards });
  });
});

module.exports = router;
