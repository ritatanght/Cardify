const db = require("../../configs/db.config");

const postCardsData = (cardsData) => {
  const promises = cardsData.map(cardData => {
    const query = `
      INSERT INTO cards(front, back, set_id)
      VALUES($1, $2, $3)
    `;
    return db.query(query, [
      cardData.front,
      cardData.back,
      cardData.setId
    ]);
  });
  return Promise.all(promises);
};

const updateCardsData = (cardsData) => {
  const promises = cardsData.map(cardData => {
    const query = `
    UPDATE cards
    SET front = $1,
    back = $2,
    deleted = $3
    WHERE id = $4;
    `;
    return db.query(query, [
      cardData.front,
      cardData.back,
      cardData.deleted,
      cardData.id
    ]);
  })
  return Promise.all(promises)
}

const getCardsBySetId = (setId) => {
  return db
    .query(
      `
      SELECT * FROM cards
      WHERE set_id = $1;`,
      [setId]
    )
    .then((data) => data.rows);
};

module.exports = { 
  postCardsData,
  updateCardsData, 
  getCardsBySetId };
