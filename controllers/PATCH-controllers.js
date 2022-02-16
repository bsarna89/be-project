
const { fetchArticleIdAndUpdate } = require("../models/PATCH-models");

const updateArticle = ((req, res, next) => {

    const id = parseInt(req.params.article_id);
    const body = req.body;


    fetchArticleIdAndUpdate(id, body).then((article) => {

        res.status(200).send({ article });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })


})

module.exports = { updateArticle };