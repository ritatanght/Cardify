const router = require('express').Router();
const cards = require("../db/queries/cards")

router.post('/create', (req, res) => {
  cards.postCardData(req.body)
    .then(result => {
      res.status(201).json({ success: true, message: "Set created successfully", data: result });
    })
    .catch(err => {
      res.status(500)
      console.err(err)
    })
})

module.exports = router;