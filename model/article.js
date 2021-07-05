const { axios, sharedHeaders, getTokenFromHeaders } = require('./index');
const appendQuery = require('append-query');
const get = require('lodash.get');
const { articlePaths } = require('../apiPaths');

async function getAllArticles({
    limit, offset, author, favorited, tag
}, headers) {
    const token = getTokenFromHeaders(headers);
    const options = {
        method: 'get',
        url: appendQuery(articlePaths.MANY_ARTICLES, { limit, offset })
    }
    let response;
    if (!author && !token && !favorited && !tag) {
        response = await axios(options);

    } else {
        options.url = appendQuery(articlePaths.MANY_ARTICLES, { limit, offset, author, tag, favorited });
        options.headers = sharedHeaders(token);

        response = await axios(options);
    }

    return get(response, 'data.articles', null);
}

async function getArticle(headers, slug) {
    const token = getTokenFromHeaders(headers);

    return await axios({
        method: 'get',
        url: articlePaths.ONE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

}

async function createArticle(headers, payload) {
    const token = getTokenFromHeaders(headers);

    const response = await axios({
        method: 'post',
        url: articlePaths.MANY_ARTICLES,
        headers: sharedHeaders(token),
        data: { article: { ...payload } }
    })

    return get(response, 'data.article', null);
}

async function updateArticle(headers, payload) {
    const token = getTokenFromHeaders(headers);

    const response = await axios({
        method: 'put',
        url: articlePaths.ONE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token),
        data: { article: { ...payload } }
    })

    return get(response, 'data.article', null);
}

async function addFavoriteArticle(headers, slug) {
    const token = getTokenFromHeaders(headers);

    const response = await axios({
        method: 'post',
        url: articlePaths.FAVORITE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

    return get(response, 'data.article', null);
}

async function removeFavoriteArticle(headers, slug) {
    const token = getTokenFromHeaders(headers);

    const response = await axios({
        method: 'delete',
        url: articlePaths.FAVORITE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

    return get(response, 'data.article', null);
}

async function deleteArticle(slug, headers) {
    const token = getTokenFromHeaders(headers)
    const response = await axios({
        method: 'delete',
        url: articlePaths.ONE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

    const statusCode = get(response, 'status', null);
    if (statusCode === 200) return { message: 'Deleted successfully!' };
    return null;
}

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    addFavoriteArticle,
    removeFavoriteArticle,
    deleteArticle
}