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

const fetchArticles = (sortby = 'created_at', order = 'DESC', topic) => {


    order = order.toUpperCase();
    const validOrder = ['ASC', 'DESC'];
    if (!validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    const validSortBy = ['created_at', 'article_id', 'votes', 'comment_count'];
    if (!validSortBy.includes(sortby)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }


    let str = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles
               LEFT JOIN comments ON comments.article_id = articles.article_id`

    if (topic !== undefined) str += ` WHERE articles.topic = '${topic}'`

    str += ` GROUP BY articles.article_id`

    if (sortby !== "comment_count")
        str += ` ORDER BY articles.${sortby} ${order};`;
    else {
        str += ` ORDER BY COUNT(comments.article_id) ${order};`
    }

    return db.query(str).then(({ rows }) => {

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }


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

const fetchUsersByUsername = (username) => {

    if (typeof username === undefined) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    let str = `SELECT * FROM users WHERE username = $1;`

    return db.query(str, [username]).then(({ rows }) => {

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Path not found" });
        }
        return rows[0];
    })
}



module.exports = {
    fetchTopics,
    fetchArticleId,
    fetchUsers,
    fetchArticles,
    fetchCommentsByArticleId,
    fetchUsersByUsername
};

