const { axios } = require('./index');
const get = require('lodash.get')

async function getAllComments(slug) {
    const response = await axios({
        url: `/articles/${slug}/comments`,
        method: 'get'
    })

    const data = get(response, 'data.comments', null);
    return data;
}

module.exports = {
    getAllComments
}