const userPaths = {
    SINGLE_USER: '/user',
    SINGLE_PROFILE: {
        getPath: (username) => `/profiles/${username}`
    },
    MANY_USERS: '/users',
    LOGIN_PATH: '/users/login',
    FOLLOW_PROFILE_PATH: {
        getPath: (username) => `/profiles/${username}/follow`
    }
}

const articlePaths = {
    MANY_ARTICLES: '/articles',
    ONE_ARTICLE: {
        getPath: (slug) => `/articles/${slug}`
    },
    FAVORITE_ARTICLE: {
        getPath: (slug) => `/articles/${slug}/favorite`
    }
}

const commentPaths = {
    ONE_COMMENT: {
        getPath: (slug) => `/articles/${slug}/comments`
    },
    COMMENT_BY_ID: {
        getPath: (slug, commentId) => `/articles/${slug}/comments/${commentId}`
    }
}

const tagPaths = {
    TAGS: '/tags'
}

module.exports = {
    userPaths,
    articlePaths,
    commentPaths,
    tagPaths
}