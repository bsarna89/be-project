const express = require('express');
const app = express();
app.use(express.json());

const { getTopics, getUsers } = require("./controllers/GET-controllers");
const { serverError } = require('./errors');



app.get('/api/topics', getTopics);
app.get('/api/users', getUsers);






app.all("/*", (req, res) => {
    console.log("Path error")
    res.status(404).send({ msg: "Path not found" });
})

app.use(serverError);

module.exports = app;