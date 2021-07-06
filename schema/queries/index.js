const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const { UserType, ProfileType, ArticleType, CommentType, TagType } = require('../types');
const get = require('lodash.get');

const { getMe, getProfile } = require('../../model/auth');
const { getAllArticles, getArticle } = require('../../model/article');
const { getAllComments } = require('../../model/comment');
const { getAllTags } = require('../../model/tags');

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: {
            type: UserType,
            description: 'Query your own account information after you sign in',
            resolve: async (_parent, args, { headers }) => await getMe(headers)
        },
        profile: {
            type: ProfileType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_parent, args, { headers }) => await getProfile(headers, args.username)
        },
        articles: {
            type: new GraphQLList(ArticleType),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt },
                author: { type: GraphQLString },
                favorited: { type: GraphQLString },
                tag: { type: GraphQLString }
            },
            resolve: async (_parent, args, { headers }) => await getAllArticles(args, headers)
        },
        article: {
            type: ArticleType,
            args: {
                slug: { type: GraphQLString }
            },
            resolve: async (_parent, args, { headers }) => await getArticle(headers, args.slug)
        },
        comments: {
            type: new GraphQLList(CommentType),
            args: {
                slug: { type: GraphQLString }
            },
            resolve: async (_parent, args) => await getAllComments(args.slug)
        },
        tags: {
            type: TagType,
            resolve: async (_) => await getAllTags()
        }
    })
})

module.exports = rootQuery