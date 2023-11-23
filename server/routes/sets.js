const router = require("express").Router();
const sets = require("../db/queries/sets");
const cards = require("../db/queries/cards");

router.post("/create", (req, res) => {
  // make sure the user is logged-in
  if (!req.session.userId)
    return res.status(401).json({ message: "Please log in first." });

  sets
    .postSetData(req.body)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Set created successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500);
      console.error(err);
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
        res.status(500);
        console.error(err);
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

router.get("/user/:id", (req, res) => {
  // const { id } = req.params;
  const userId = req.session.userId;

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
