const { is } = require('express/lib/request');
const db = require('../db/connection');

const fetchTopics = () => {

    let str = `SELECT slug, description FROM topics`;

    return db.query(str).then(({ rows }) => {
        return rows;
    })
}


const fetchUsers = () => {

    let str = `SELECT username FROM users`;

    return db.query(str).then(({ rows }) => {

        return rows;
    })
}

const fetchArticles = () => {

    let str = `SELECT * FROM articles;`;

    return db.query(str).then(({ rows }) => {

        return rows;
    })
}

const fetchArticleId = (id) => {

    if (Number.isNaN(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    let str = `SELECT * FROM articles
               WHERE articles.article_id = $1;`;

    return db.query(str, [id]).then(({ rows }) => {

        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Resource not found" });
        }

        return rows;
    })
}



module.exports = { fetchTopics, fetchArticleId, fetchUsers, fetchArticles };

