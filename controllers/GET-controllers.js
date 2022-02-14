const { fetchTopics } = require("../models/GET-models");


const getTopics = ((req, res, next) => {

    fetchTopics().then((topics) => {
        console.log(topics, "controller");
        res.status(200).send({ topics: topics });

    })
        .catch((err) => {
            console.log(err, "controller err");
            next(err);
        })

})


module.exports = { getTopics };












module.exports = { getTopics };