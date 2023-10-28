const db = require("../../configs/db.config");

const getAllCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => data.rows);
};

module.exports = { getAllCategories };
