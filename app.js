const express = require('express');
const app = express();
app.use(express.json());

const { getTopics, getArticleId } = require("./controllers/GET-controllers");
const { serverError, handleCustomErrors } = require('./errors');



app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleId);




app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})

app.use(handleCustomErrors);
app.use(serverError);

module.exports = app;