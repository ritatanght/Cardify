const router = require('express').Router();
const cards = require("../db/queries/cards")

router.post('/create', (req, res) => {
  cards.postCardsData(req.body)
    .then(result => {
      res.status(201).json({ success: true, message: "Cards created successfully", data: result });
    })
    .catch(err => {
      res.status(500)
      console.error(err)
    })
})

router.put('/edit/:id', (req, res) => {
  cards.updateCardsData(req.body)
    .then(result => {
      res.status(200).json({ message: "Cards updated", data: result })
    })
    .catch(err => {
      res.status(500)
      console.error(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  cards.getCardsBySetId(id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500)
      console.error(err)
    })
})

module.exports = router;