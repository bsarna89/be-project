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

    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    const validCommentCount = [0, 1];
    if (!validCommentCount.includes(commentCount)) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }

    let str = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles
               LEFT JOIN comments ON comments.article_id = $1
               WHERE articles.article_id = $1
               GROUP BY articles.article_id;`;

    return db.query(str, [id]).then(({ rows }) => {


        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        if (commentCount === 0) {
            delete rows[0].comment_count;
            return rows[0];
        }
        rows[0].comment_count = parseInt(rows[0].comment_count);
        return rows[0];
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

        return rows;
    })

}



module.exports = { fetchTopics, fetchArticleId, fetchUsers, fetchArticles, fetchCommentsByArticleId };

