const router = require("express").Router()
const searches = require("../db/queries/searches")

router.get("/:query", (req, res) => {
  searches.searchByText(req.params.query)
    .then(data => {
      res.json(data.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
})

module.exports = router;