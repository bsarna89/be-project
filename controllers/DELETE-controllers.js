const { removeComment } = require('../models/DELETE-models');

const deleteComment = ((req, res, next) => {


    const id = parseInt(req.params.comment_id);

    removeComment(id).then((comment) => {

        res.status(204).send();

    })
        .catch((err) => {

            next(err);
        })


})

module.exports = { deleteComment };