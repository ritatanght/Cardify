const db = require("../../configs/db.config");

const postSetData = (setData) => {
  const query = `
  INSERT INTO sets (title, description, private, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5) RETURNING id;
  `;
  return db.query(query, [setData.title, setData.description, setData.private, setData.category_id, setData.user_id])
};

const getSetInfoById = (setId) => {
  return db
    .query(
      `
      SELECT sets.*, categories.name AS category_name, username
      FROM sets
      JOIN categories ON category_id = categories.id
      JOIN users ON user_id = users.id
      WHERE sets.id = $1;`,
      [setId]
    )
    .then((data) => data.rows[0]);
};

module.exports = { postSetData, getSetInfoById };

