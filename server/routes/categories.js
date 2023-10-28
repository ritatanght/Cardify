const router = require("express").Router();
const categories = require("../db/queries/categories");

router.get("/", (req, res) => {
  categories.getAllCategories().then((data) => res.json(data));
});

module.exports = router;
