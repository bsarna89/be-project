const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db/connection');


const { serverError, handleCustomErrors } = require('./errors');
const getArticles = ((req, res, next) => {


    fetchArticles().then((articles) => {

        res.status(200).send({ articles: articles });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })


})

const fetchArticles = () => {

    let str = `SELECT * FROM articles;`;

    return db.query(str).then(({ rows }) => {

        console.log(rows);

        return rows;
    })
}

app.get('/api/articles', getArticles);



app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})

app.use(handleCustomErrors);
app.use(serverError);

module.exports = app;