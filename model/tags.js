const get = require('lodash.get');
const { tagPaths } = require('../apiPaths');
const { axios } = require('./index');

async function getAllTags() {
    
    const response = await axios({
        url: tagPaths.TAGS,
        method: 'get'
    })

    const data = get(response, 'data', null);

    return data;
}

module.exports = { getAllTags };