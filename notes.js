const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db/connection');


const { serverError, handleCustomErrors, psqlError } = require('./errors');
const { fetchArticleId } = require('./models/GET-models');


const getArticles = ((req, res, next) => {

    console.log(req.query, "controller");
    const { sortby, order, topic } = req.query;
    console.log(req.query.hasOwnProperty('comment_count'));

    const comment_count = req.query.hasOwnProperty('comment_count') ? 1 : 0;

    fetchArticles(comment_count, sortby, order, topic).then((articles) => {

        res.status(200).send({ articles: articles });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})

const fetchArticles = (comment_count, sortby = 'articles.created_at', order = 'DESC', topic = 'cats') => {

    console.log(comment_count, "models");

    const validCommentCount = [0, 1];
    if (!validCommentCount.includes(comment_count)) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }

    let str = `SELECT * FROM articles ORDER BY articles.created_at DESC`;

    return db.query(str).then(({ rows }) => {

        console.log(rows);
        if (comment_count === 0) return rows;
        if (comment_count === 1) {
            return fetchArticleId(rows[0].article_id, 1);

        }
    })
}





app.get('/api/articles', getArticles);



app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})


app.use(handleCustomErrors);
app.use(psqlError);
app.use(serverError);

module.exports = app;