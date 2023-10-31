const db = require("../../configs/db.config");

const postSetData = (setData) => {
  const query = `
  INSERT INTO sets (title, description, private, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5) RETURNING id;
  `;
  return db.query(query, [
    setData.title,
    setData.description,
    setData.private,
    setData.category_id,
    setData.user_id,
  ]);
};

const getSetsByUserId = (userId) => {
  const query = `
    SELECT sets.*
    FROM sets
    JOIN users ON user_id = users.id
    WHERE sets.user_id = $1;
  `;
  return db.query(query, [userId]).then((data) => data.rows);
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

const getSetsByCategoryId = (categoryId) => {
  return db
    .query(
      `
    SELECT sets.*, username FROM sets 
    JOIN users ON user_id = users.id
    WHERE category_id = $1
    AND private = false
    AND sets.deleted = false
  ;`,
      [categoryId]
    )
    .then((data) => data.rows);
};

module.exports = {
  postSetData,
  getSetsByUserId,
  getSetInfoById,
  getSetsByCategoryId,
};
