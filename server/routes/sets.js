const router = require("express").Router();
const sets = require("../db/queries/sets");
const cards = require("../db/queries/cards");

router.post("/create", (req, res) => {
  // make sure the user is logged-in
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ message: "Please log in first." });
  const { title, description, category_id } = req.body;
  if (!title || !description)
    return res
      .status(400)
      .json({ message: "Title and description cannot be empty" });
  if (!category_id)
    return res.status(400).json({ message: "Please pick a category" });

  sets
    .postSetData({ ...req.body, user_id: userId })
    .then((result) => {
      return res.status(201).json({
        message: "Set created successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).end();
    });
});

router.put("/edit/:id", (req, res) => {
  const setId = req.params.id;

  const userId = req.session.userId;
  // make sure the user is logged-in
  if (!userId) return res.status(401).json({ message: "Please log in first." });

  // make sure the user who edits the set is the set owner
  sets.getSetOwnerBySetId(setId).then((data) => {
    if (data.user_id !== userId)
      return res
        .status(403)
        .json({ message: "You can only edit your own set." });

    sets
      .updateSetData(setId)
      .then((response) => {
        res
          .status(200)
          .json({ message: "Set update successfully", data: response });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).end();
      });
  });
});

router.delete("/delete/:id", (req, res) => {
  const setId = req.params.id;

  const userId = req.session.userId;
  // make sure the user is logged-in
  if (!userId) return res.status(401).json({ message: "Please log in first." });

  // make sure the user who deletes the set is the set owner
  sets.getSetOwnerBySetId(setId).then((data) => {
    if (data.user_id !== userId)
      return res
        .status(403)
        .json({ message: "You can only delete your own set." });

    // set the set as deleted in the database
    sets
      .setSetToDeleted(setId)
      .then(() => {
        return res.status(200).json({ message: "Set deleted" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).end();
      });
  });
});

// Get the sets created by the current user in profile page
router.get("/user", (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ message: "Please log in first." });

  sets
    .getSetsByUserId(userId)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).end();
    });
});

// Get the sets and cards for ViewSets and EditSet
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const setPromise = sets.getSetInfoById(id);
  const cardsPromise = cards.getCardsBySetId(id);

  Promise.all([setPromise, cardsPromise])
    .then(([set, cards]) => {
      if (!set) return res.status(404).json({ message: "Set not found" });
      return res.json({ set, cards });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
