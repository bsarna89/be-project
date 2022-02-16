const { removeComment } = require('../models/DELETE-models');

const deleteComment = ((req, res, next) => {

    console.log(req.params, "control");
    const id = parseInt(req.params.comment_id);

    removeComment(id).then((comment) => {

        res.status(204).send();

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })


})

module.exports = { deleteComment };