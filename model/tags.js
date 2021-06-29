const get = require('lodash.get');
const { axios } = require('./index');

async function getAllTags() {
    
    const response = await axios({
        url: '/tags',
        method: 'get'
    })

    const data = get(response, 'data', null);

    return data;
}

module.exports = { getAllTags };