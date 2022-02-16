const db = require('../db/connection');
const format = require("pg-format");


const insertComment = (id, body) => {


    const bodyStr = body.body;
    const username = body.username;

    if (Object.keys(body).length !== 2) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }


    if (typeof bodyStr !== "string" || typeof username !== "string") {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }


    const array = [bodyStr, username, id, 0];

    const str = ` INSERT INTO comments(body, author, article_id, votes)
                  VALUES($1,$2,$3,$4)
                  RETURNING*;`


    return db.query(str, array).then(({ rows }) => {


        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        return rows[0];
    })

}

module.exports = { insertComment };