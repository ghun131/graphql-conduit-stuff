const { axios, sharedHeaders, getTokenFromHeaders } = require('./index');
const get = require('lodash.get')
const omit = require('lodash.omit')
const { commentPaths } = require('../apiPaths');

async function getAllComments(slug) {
    const response = await axios({
        url: commentPaths.ONE_COMMENT.getPath(slug),
        method: 'get'
    })

    const data = get(response, 'data.comments', null);
    return data;
}

async function addComment(input, headers) {
    const token = getTokenFromHeaders(headers);

    const { slug, token } = input;
    const payload = omit(input, ['slug', 'token']);
    const response = await axios({
        url: commentPaths.ONE_COMMENT.getPath(slug),
        method: 'post',
        headers: sharedHeaders(token),
        data: { comment: { ...payload } },
    })

    return get(response, 'data.comment', null);
}

async function deleteComment(input, headers) {
    const token = getTokenFromHeaders(headers);

    const { slug, commentId } = input;
    const response = await axios({
        url: commentPaths.COMMENT_BY_ID.getPath(slug, commentId),
        method: 'delete',
        headers: sharedHeaders(token)
    })

    const statusCode = get(response, 'status', null);
    if (statusCode === 200) return { message: "Deleted successfully!" }
    return null;
}

module.exports = {
    getAllComments,
    addComment,
    deleteComment
}