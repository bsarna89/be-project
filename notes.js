const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db/connection');


const { serverError, handleCustomErrors } = require('./errors');




app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})

app.use(handleCustomErrors);
app.use(serverError);

module.exports = app;