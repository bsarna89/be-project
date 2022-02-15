const { fetchTopics, fetchArticleId } = require("../models/GET-models");


const getTopics = ((req, res, next) => {

    fetchTopics().then((topics) => {

        res.status(200).send({ topics: topics });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})

const getArticleId = ((req, res, next) => {

    const id = parseInt(req.params.article_id);


    fetchArticleId(id).then((article) => {

        res.status(200).send({ article: article });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})




module.exports = { getTopics, getArticleId };






