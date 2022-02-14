const db = require('../db/connection');

const fetchTopics = () => {

    let str = `SELECT slug, description FROM topics`;

    return db.query(str).then(({ rows }) => {
        console.table(rows);
        return rows;
    })
}

module.exports = { fetchTopics };