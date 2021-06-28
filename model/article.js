const { axios, sharedHeaders } = require('./index');
const appendQuery = require('append-query');

async function getAllArticles({
    limit, offset, author, token, favorited, tag
}) {
    const options = {
        method: 'get',
        url: appendQuery('/articles', { limit, offset })
    }
    let response;
    if (!author && !token && !favorited && !tag) {
        response = await axios(options);

    } else {
        options.url = appendQuery('/articles', { limit, offset, author, tag, favorited });
        options.headers = sharedHeaders(token);

        response = await axios(options);
    }
    return response;
}

async function getArticle(token, slug) {
    return await axios({
        method: 'get',
        url: '/articles/' + slug,
        headers: sharedHeaders(token)
    })

}

module.exports = {
    getAllArticles,
    getArticle
}