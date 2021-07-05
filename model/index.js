const axios = require('axios');
const cookieHandler = require('cookie');

axios.defaults.baseURL = "https://conduit.productionready.io/api";

function sharedHeaders(token) {
    return {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
    }
}

function getTokenFromHeaders(headers) {
    const { cookie } = headers;
    if (!cookie) return null;
    const cookies = cookieHandler.parse(cookie);
    const { authToken } = cookies;
    if (!authToken) return null;

    return authToken;
}

module.exports = { axios, sharedHeaders, getTokenFromHeaders }