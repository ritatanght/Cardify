const db = require("../../configs/db.config");

const postSetData = (setData) => {
  const query = `
  INSERT INTO sets (title, description, private, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5) RETURNING id;
  `;

  return db.query(query, [setData.title, setData.description, setData.private, setData.category_id, setData.user_id])
}

module.exports = { postSetData };