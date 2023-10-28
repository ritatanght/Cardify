const router = require('express').Router();
const sets = require("../db/queries/sets")

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

module.exports = router;