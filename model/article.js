const { axios, sharedHeaders } = require('./index');
const appendQuery = require('append-query');
const omit = require('lodash.omit');
const get = require('lodash.get');
const { articlePaths } = require('../apiPaths');

async function getAllArticles({
    limit, offset, author, token, favorited, tag
}) {
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
    return response;
}

async function getArticle(token, slug) {
    return await axios({
        method: 'get',
        url: articlePaths.ONE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

}

async function createArticle(payload) {
    const newPayload = omit(payload, ['token']);
    const { token } = payload;
    const response = await axios({
        method: 'post',
        url: articlePaths.MANY_ARTICLES,
        headers: sharedHeaders(token),
        data: { article: { ...newPayload } }
    })

    return get(response, 'data.article', null);
}

async function updateArticle(payload) {
    const { token, slug } = payload;
    const newPayload = omit(payload, ['token', 'slug']);
    const response = await axios({
        method: 'put',
        url: articlePaths.ONE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token),
        data: { article: { ...newPayload } }
    })

    return get(response, 'data.article', null);
}

async function addFavoriteArticle(slug, token) {
    const response = await axios({
        method: 'post',
        url: articlePaths.FAVORITE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

    return get(response, 'data.article', null);
}

async function removeFavoriteArticle(slug, token) {
    const response = await axios({
        method: 'delete',
        url: articlePaths.FAVORITE_ARTICLE.getPath(slug),
        headers: sharedHeaders(token)
    })

    return get(response, 'data.article', null);
}

async function deleteArticle(slug, token) {
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