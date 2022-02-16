const db = require('../db/connection');


const removeComment = (id) => {

    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    let str = `DELETE FROM comments WHERE comment_id = $1 RETURNING*;`;

    return db.query(str, [id]).then(({ rows }) => {

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        return rows[0];
    })
}

module.exports = { removeComment };