exports.psqlError = (err, req, res, next) => {
    console.log("sqlError");
    console.log(err);
    if (err.code === "23503") {
        res.status(400).send({ msg: 'Bad Request' });
    }
    else {
        next(err);
    }
};


exports.handleCustomErrors = (err, req, res, next) => {
    console.log("handleCustomError");
    console.log(err);
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};



exports.serverError = (err, req, res, next) => {
    console.log("serverError");
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
};