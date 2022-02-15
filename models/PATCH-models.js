const db = require('../db/connection');
const { fetchArticleId } = require('./GET-models');


const fetchArticleIdAndUpdate = (id) => {

    fetchArticleId(id).then((article) => {

    })
}

module.exports = { fetchArticleIdAndUpdate };