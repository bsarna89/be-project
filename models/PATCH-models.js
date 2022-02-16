const db = require('../db/connection');



const fetchArticleIdAndUpdate = (id, body) => {



    if (Object.keys(body).length !== 1) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    if (typeof body.inc_votes !== "number") {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    const str = 'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING*;'
    const array = [body.inc_votes, id];

    return db.query(str, array).then(({ rows }) => {

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        return rows[0];
    })
}

module.exports = { fetchArticleIdAndUpdate };