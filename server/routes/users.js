const router = require('express').Router();
const users = require('../db/queries/users')

router.get('/:id', (req, res) => {
  const { id } = req.params

  users.getUserUsername(id)
    .then(data => { data ? res.json(data) : res.status(404).json({ message: "User not found" }) })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: "Something went wrong" })
    })

});

module.exports = router;