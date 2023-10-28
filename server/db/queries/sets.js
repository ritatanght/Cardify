const db = require("../../configs/db.config");

const postSetData = (setData) => {
  const query = `
  INSERT INTO sets (title, description, private, category_id)
  VALUES ($1, $2, $3, $4) RETURNING id;
  `;

  return db.query(query, [setData.title, setData.description, setData.private, setData.category_id])
}

module.exports = { postSetData };