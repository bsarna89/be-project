
const { fetchArticleIdAndUpdate } = require("../models/PATCH-models");

const updateArticle = ((req, res, next) => {

    const id = parseInt(req.params.article_id);
    const body = req.body;

    console.log(id, "id");
    console.log(req.body, "body");

    fetchArticleIdAndUpdate(id, body).then((article) => {

        console.log(article, "controller");


    });


})

module.exports = { updateArticle };