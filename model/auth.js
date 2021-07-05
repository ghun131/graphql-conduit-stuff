const { axios, sharedHeaders, getTokenFromHeaders } = require('./index')
const get = require('lodash.get');
const { userPaths } = require('../apiPaths');

async function getMe(headers) {
    const token = getTokenFromHeaders(headers);

    const response = await axios({
        url: userPaths.SINGLE_USER,
        method: 'get',
        headers: sharedHeaders(token)
    });

    return get(response, 'data.user', null);
}

async function getProfile(headers, username) {
    const token = getTokenFromHeaders(headers);
    const response = await axios({
        url: userPaths.SINGLE_PROFILE.getPath(username),
        method: 'get',
        headers: sharedHeaders(token)
    });

    const data = get(response, 'data.profile', null);

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

async function updateUserInfo(headers, data) {
    const token = getTokenFromHeaders(headers);

    const response = await axios({
        url: userPaths.SINGLE_USER,
        method: 'put',
        headers: sharedHeaders(token),
        data: {
            user: { ...data }
        }
    })

    return get(response, 'data.user', null);
}

async function followProfile(headers, email, username) {
    const token = getTokenFromHeaders(headers);

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

async function unfollowProfile(headers, username) {
    const token = getTokenFromHeaders(headers);

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