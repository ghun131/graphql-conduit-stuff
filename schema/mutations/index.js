const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const {
    createArticle,
    updateArticle,
    addFavoriteArticle,
    removeFavoriteArticle,
    deleteArticle
} = require('../../model/article');
const { registerUser, login, updateUserInfo, followProfile, unfollowProfile } = require('../../model/auth');
const { addComment, deleteComment } = require('../../model/comment');
const {
    ProfileType,
    UserType,
    InputUserType,
    ArticleType,
    InputArticleType,
    InputUpdateArticleType,
    CommentType,
    InputCommentType,
    DeleteCommentType,
    DeletedType
} = require('../types');


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        register: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_parent, args) => await registerUser(args.username, args.email, args.password)
        },
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_parent, args) => await login(args.email, args.password)
        },
        updateUser: {
            type: UserType,
            args: {
                input: { type: InputUserType }
            },
            resolve: async (_parent, args) => await updateUserInfo({
                username: args.input.username,
                password: args.input.password,
                email: args.input.email,
                bio: args.input.bio,
                image: args.input.image,
                token: args.input.token
            })
        },
        createArticle: {
            type: ArticleType,
            args: {
                input: { type: InputArticleType }
            },
            resolve: async (_parent, args) => createArticle(args.input)
        },
        updateArticle: {
            type: ArticleType,
            args: {
                input: { type: InputUpdateArticleType }
            },
            resolve: async (_parent, args) => updateArticle(args.input)
        },
        addFavorite: {
            type: ArticleType,
            args: {
                token: { type: GraphQLString },
                slug: { type: GraphQLString }
            },
            resolve: async (_parent, args) => await addFavoriteArticle(args.slug, args.token)
        },
        removeFavorite: {
            type: ArticleType,
            args: {
                token: { type: GraphQLString },
                slug: { type: GraphQLString }
            },
            resolve: async (_, args) => await removeFavoriteArticle(args.slug, args.token)
        },
        addComment: {
            type: CommentType,
            args: {
                input: { type: InputCommentType }
            },
            resolve: async (_, args) => await addComment(args.input)
        },
        deleteComment: {
            type: DeletedType,
            args: {
                input: { type: DeleteCommentType }
            },
            resolve: async (_, args) => await deleteComment(args.input)
        },
        deleteArticle: {
            type: DeletedType,
            args: {
                slug: { type: GraphQLString },
                token: { type: GraphQLString },
            },
            resolve: async (_, args) => await deleteArticle(args.slug, args.token)
        },
        followUser: {
            type: ProfileType,
            args: {
                token: { type: GraphQLString },
                email: { type: GraphQLString },
                username: { type: GraphQLString }
            },
            resolve: async (_, args) => await followProfile(args.token, args.email, args.username)
        },
        unfollowUser: {
            type: DeletedType,
            args: {
                token: { type: GraphQLString },
                username: { type: GraphQLString }
            },
            resolve: async (_, args) => unfollowProfile(args.token, args.username)
        }
    })
})

module.exports = mutation;