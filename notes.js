const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db/connection');


const { serverError, handleCustomErrors, psqlError } = require('./errors');
const { fetchArticleId } = require('./models/GET-models');






app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})


app.use(handleCustomErrors);
app.use(psqlError);
app.use(serverError);

module.exports = app;