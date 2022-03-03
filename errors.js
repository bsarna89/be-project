exports.psqlError = (err, req, res, next) => {

    if (err.code === "23503") {
        res.status(400).send({ msg: 'Bad Request' });
    }
    else {
        next(err);
    }
};


exports.handleCustomErrors = (err, req, res, next) => {

    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};



exports.serverError = (err, req, res, next) => {

    res.status(500).send({ msg: 'Internal Server Error' });
};