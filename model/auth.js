const { axios, sharedHeaders } = require('./index')

async function getMe(token) {
    const response = await axios({
        url: '/user',
        method: 'get',
        headers: sharedHeaders(token)
    });

    return response;
}

async function getProfile(token, username) {
    const response = await axios({
        url: '/profiles/' + username,
        method: 'get',
        headers: sharedHeaders(token)
    });

    return response;

}

module.exports = {
    getMe,
    getProfile
}