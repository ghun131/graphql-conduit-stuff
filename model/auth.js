const { axios, sharedHeaders } = require('./index')
const get = require('lodash.get');
const omit = require('lodash.omit');
const { userPaths } = require('../apiPaths');

async function getMe(token) {
    const response = await axios({
        url: userPaths.SINGLE_USER,
        method: 'get',
        headers: sharedHeaders(token)
    });

    return response;
}

async function getProfile(token, username) {
    const response = await axios({
        url: userPaths.SINGLE_PROFILE.getPath(username),
        method: 'get',
        headers: sharedHeaders(token)
    });

    return response;

}

async function registerUser(username, email, password) {
    const response = await axios({
        url: userPaths.MANY_USERS,
        method: 'post',
        data: {
            user: { username, email, password }
        }
    })

    return get(response, 'data.user', null);
}

async function login(email, password) {
    const response = await axios({
        url: userPaths.LOGIN_PATH,
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
        url: userPaths.SINGLE_USER,
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
        url: userPaths.FOLLOW_PROFILE_PATH.getPath(username),
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
        url: userPaths.FOLLOW_PROFILE_PATH.getPath(username),
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