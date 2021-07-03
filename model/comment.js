const { axios, sharedHeaders } = require('./index');
const get = require('lodash.get')
const omit = require('lodash.omit')

async function getAllComments(slug) {
    const response = await axios({
        url: `/articles/${slug}/comments`,
        method: 'get'
    })

    const data = get(response, 'data.comments', null);
    return data;
}

async function addComment(input) {
    const { slug, token } = input;
    const payload = omit(input, ['slug', 'token']);
    const response = await axios({
        url: `/articles/${slug}/comments`,
        method: 'post',
        headers: sharedHeaders(token),
        data: { comment: { ...payload } },
    })

    return get(response, 'data.comment', null);
}

async function deleteComment(input) {
    const { slug, token, commentId } = input;
    const response = await axios({
        url: `/articles/${slug}/comments/${commentId}`,
        method: 'delete',
        headers: sharedHeaders(token)
    })

    const statusCode = get(response, 'status', null);
    if (statusCode === 200) return { message: "Deleted successfully!"}
    return null;
}

module.exports = {
    getAllComments,
    addComment,
    deleteComment
}