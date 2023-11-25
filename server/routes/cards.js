const router = require("express").Router();
const cards = require("../db/queries/cards");

// router.post("/create", (req, res) => {
//   cards
//     .postCardsData(req.body)
//     .then((result) => {
//       res.status(201).json({
//         success: true,
//         message: "Cards created successfully",
//         data: result,
//       });
//     })
//     .catch((err) => {
//       res.status(500);
//       console.error(err);
//     });
// });

router.put("/edit/:id", (req, res) => {
  cards
    .updateCardsData(req.body)
    .then((result) => {
      res.status(200).json({ message: "Cards updated", data: result });
    })
    .catch((err) => {
      res.status(500);
      console.error(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  cards
    .getCardsBySetId(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500);
      console.error(err);
    });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;

  // Validation
  if (!front.trim() || !back.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "Front and back text cannot be empty" });
  }

  const userId = req.session.userId;
  // make sure the user is logged-in
  if (!userId) return res.status(401).json({ message: "Please log in first." });

  // make sure the user who edits the card is the owner
  cards.getCardOwnerByCardId(id).then((data) => {
    if (data.user_id !== userId)
      return res
        .json(403)
        .json({ message: "You can only edit your own card." });

    // Update the card
    cards
      .updateCardById(id, { front, back })
      .then(() => {
        res
          .status(200)
          .json({ success: true, message: "Card updated successfully" });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: "Error updating card", error: err });
      });
  });
});

module.exports = router;
