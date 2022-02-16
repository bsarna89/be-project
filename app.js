const express = require('express');
const app = express();
app.use(express.json());


const { getTopics, getArticleId, getUsers, getArticles } = require("./controllers/GET-controllers");
const { serverError, handleCustomErrors } = require('./errors');
const { updateArticle } = require('./controllers/PATCH-controllers');
const { postComment } = require('./controllers/POST-controllers');



app.get('/api/topics', getTopics);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleId);


app.patch('/api/articles/:article_id', updateArticle);

app.post('/api/articles/:article_id/comments', postComment);


app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})

app.use(handleCustomErrors);
app.use(serverError);

module.exports = app;