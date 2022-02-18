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

const fetchArticles = (comment_count, sortby = 'created_at', order = 'DESC', topic = 'no_topic') => {

    const validCommentCount = [0, 1];
    if (!validCommentCount.includes(comment_count)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    order = order.toUpperCase();
    const validOrder = ['ASC', 'DESC'];
    if (!validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    const validSortBy = ['created_at', 'article_id', 'votes'];
    if (!validSortBy.includes(sortby)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    const validTopic = ['no_topic', 'cats', 'mitch'];
    if (!validTopic.includes(topic)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    let str = `SELECT * FROM articles`
    if (topic !== 'no_topic') str += ` WHERE articles.topic = '${topic}'`
    str += ` ORDER BY articles.${sortby} ${order}`;

    return db.query(str).then(({ rows }) => {

        //console.log(rows);
        if (comment_count === 0) { return rows; }
        if (comment_count === 1) {

            array = rows.map((row) => { return fetchArticleId(row.article_id, 1); })
            return Promise.all(array).then((articles) => {
                return articles;
            })


        }
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

const fetchUsersByUsername = (id) => {


}



module.exports = {
    fetchTopics,
    fetchArticleId,
    fetchUsers,
    fetchArticles,
    fetchCommentsByArticleId,
    fetchUsersByUsername
};

