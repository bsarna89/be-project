const { insertComment } = require("../models/POST-models");


const postComment = ((req, res, next) => {

    const id = parseInt(req.params.article_id);
    const body = req.body;
    console.log(id, "id controllers");
    console.log(req.body, "body controllers")


    insertComment(id, body).then((comment) => {

        res.status(200).send({ comment: comment });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })


})

module.exports = { postComment };