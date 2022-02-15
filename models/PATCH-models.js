const db = require('../db/connection');
const { fetchArticleId } = require('./GET-models');


const fetchArticleIdAndUpdate = (id, body) => {

    fetchArticleId(id).then((article) => {
        console.log(article, "model");
    })
}

module.exports = { fetchArticleIdAndUpdate };