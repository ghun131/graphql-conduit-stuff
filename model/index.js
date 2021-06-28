const axios = require('axios');

axios.defaults.baseURL = "https://conduit.productionready.io/api";

function sharedHeaders(token) {
    return {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
    }
}

module.exports = { axios, sharedHeaders }