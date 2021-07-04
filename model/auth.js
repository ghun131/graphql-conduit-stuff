const { axios, sharedHeaders } = require('./index')
const get = require('lodash.get');
const omit = require('lodash.omit');
const isnil = require('lodash.isnil');

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

async function registerUser(username, email, password) {
    const response = await axios({
        url: '/users',
        method: 'post',
        data: {
            user: { username, email, password }
        }
    })

    return get(response, 'data.user', null);
}

async function login(email, password) {
    const response = await axios({
        url: '/users/login',
        method: 'post',
        data: {
            user: { email, password }
        }
    })

    return get(response, 'data.user', null);
}

async function updateUserInfo(data) {
    const payload = omit(data, ['token']);

    const response = await axios({
        url: '/user',
        method: 'put',
        headers: sharedHeaders(data.token),
        data: {
            user: { ...payload }
        }
    })

    return get(response, 'data.user', null);
}

async function followProfile(token, email, username) {
    const response = await axios({
        url: `/profiles/${username}/follow`,
        method: 'post',
        headers: sharedHeaders(token),
        data: {
            user: { email }
        }
    })

    return get(response, 'data.profile', null);
}

async function unfollowProfile(token, username) {
    const response = await axios({
        url: `/profile/${username}/follow`,
        method: 'delete',
        headers: sharedHeaders(token)
    })

    const statusCode = get(response, 'status', null);
    if (statusCode === 200) return { message: "Deleted successfully!" }
    return null;
}

module.exports = {
    getMe,
    getProfile,
    registerUser,
    login,
    updateUserInfo,
    followProfile,
    unfollowProfile
}