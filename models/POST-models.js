const db = require('../db/connection');
const format = require("pg-format");


const insertComment = (id, body) => {


    const bodyStr = body.body;
    console.log(bodyStr, "model");
    const username = body.username;
    console.log(username, "model");
    //const timestamp = 
    const array = [bodyStr, username, id, 0];

    const str = ` INSERT INTO comments(body, author, article_id, votes)
                  VALUES($1,$2,$3,$4)
                  RETURNING*;`


    return db.query(str, array).then(({ rows }) => {
        console.table(rows);
        return rows;
    })
}

module.exports = { insertComment };