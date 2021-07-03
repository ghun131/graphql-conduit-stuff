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
            args: { token: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: async (_parent, args) => {
                const response = await getMe(args.token);
                const data = get(response, 'data.user', null);
                return data;
            }
        },
        profile: {
            type: ProfileType,
            args: {
                token: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_parent, args) => {
                const response = await getProfile(args.token, args.username);
                const data = get(response, 'data.profile', null);
                return data;
            }
        },
        articles: {
            type: new GraphQLList(ArticleType),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt },
                author: { type: GraphQLString },
                favorited: { type: GraphQLString },
                token: { type: GraphQLString },
                tag: { type: GraphQLString }
            },
            resolve: async (_parent, args) => {
                const response = await getAllArticles(args);
                const data = get(response, 'data.articles', null);
                return data;
            }
        },
        article: {
            type: ArticleType,
            args: {
                token: { type: GraphQLString },
                slug: { type: GraphQLString }
            },
            resolve: async (_parent, args) => {
                const response = await getArticle(args.token, args.slug);
                const data = get(response, 'data.article', null);
                return data;
            }
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