const db = require("../../configs/db.config");

const postCardData = (cardData) => {
  const query = `
  INSERT INTO cards(front, back)
  VALUES($1, $2)
  `;
  return db.query(query, [cardData.front, cardData.back])
}

module.exports = { postCardData }