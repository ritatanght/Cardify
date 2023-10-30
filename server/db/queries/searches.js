const db = require("../../configs/db.config");

const searchByText = (searchQuery) => {
  const searchTerm = `%${searchQuery}%`

  const query = `
    SELECT sets.*
    FROM sets
    WHERE title ILIKE $1 OR description ILIKE $1;
  `;

  return db.query(query, [searchTerm])
}

module.exports = {
  searchByText
}