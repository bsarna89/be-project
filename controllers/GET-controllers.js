


const { query } = require("../db/connection");
const { fetchTopics, fetchArticleId, fetchUsers, fetchArticles, fetchCommentsByArticleId } = require("../models/GET-models");
const endpoints = require('../endpoints.json');


const getDescription = ((req, res, next) => {
    res.status(200).send({ endpoints: endpoints });
})


const getTopics = ((req, res, next) => {

    fetchTopics().then((topics) => {

        res.status(200).send({ topics: topics });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})

const getUsers = ((req, res, next) => {

    fetchUsers().then((users) => {

        res.status(200).send({ users: users });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})

const getArticles = ((req, res, next) => {


    const { sortby, order, topic } = req.query;
    const commentCount = req.query.hasOwnProperty('comment_count') ? 1 : 0;

    fetchArticles(commentCount, sortby, order, topic).then((articles) => {

        res.status(200).send({ articles: articles });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})


const getArticleId = ((req, res, next) => {

    const id = parseInt(req.params.article_id);
    const commentCount = req.query.hasOwnProperty('comment_count') ? 1 : 0;

    fetchArticleId(id, commentCount).then((article) => {

        res.status(200).send({ article: article });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })


})

const getComments = ((req, res, next) => {

    const id = parseInt(req.params.article_id);

    fetchCommentsByArticleId(id).then((comments) => {

        res.status(200).send({ comments: comments });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })
})





module.exports = { getTopics, getArticleId, getUsers, getArticles, getComments, getDescription };






