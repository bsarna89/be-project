const { is } = require('express/lib/request');
const db = require('../db/connection');

const fetchTopics = () => {

    let str = `SELECT slug, description FROM topics`;

    return db.query(str).then(({ rows }) => {
        return rows;
    })
}


const fetchUsers = () => {

    let str = `SELECT username FROM users;`;

    return db.query(str).then(({ rows }) => {

        return rows;
    })
}

const fetchArticles = () => {

    let str = `SELECT * FROM articles
               ORDER BY articles.created_at DESC`;

    return db.query(str).then(({ rows }) => {


        return rows;
    })
}

const fetchArticleId = (id, commentCount) => {
    console.log(commentCount, "fetch");
    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    if (Object.keys(commentCount).length > 0) {
        commentCount.comment_count = 1;

        if (commentCount.comment_count !== 1 || Object.keys(commentCount) > 1
            || Object.keys(commentCount)[0] !== "comment_count") {

            return Promise.reject({ status: 400, msg: "Bad Request" });
        }

    }

    let str = `SELECT * FROM articles`
    if (Object.keys(commentCount).length > 0) {
        str += ` LEFT JOIN comments ON comments.article_id = $1`
    }
    str += ` WHERE articles.article_id = $1;`;

    return db.query(str, [id]).then(({ rows }) => {
        console.log(rows, "fetch");

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        if (Object.keys(commentCount).length === 0) {

            return rows[0];
        }

        const rowsToReturn = rows[0];
        rowsToReturn.comment_count = rows.length;
        delete rowsToReturn.comment_id;
        return rowsToReturn;
    })
}

const fetchCommentsByArticleId = (id) => {

    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    let str = `SELECT * FROM comments
               WHERE comments.article_id = $1;`

    return db.query(str, [id]).then(({ rows }) => {

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        rows.map((comment) => {
            delete comment.article_id;
        })
        console.log(rows);
        return rows;
    })

}



module.exports = { fetchTopics, fetchArticleId, fetchUsers, fetchArticles, fetchCommentsByArticleId };

