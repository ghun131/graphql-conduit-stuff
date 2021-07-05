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
            resolve: async (_parent, args, { res }) => {
                const response = await await login(args.email, args.password);
                const { token } = response;
                if (token) {
                    res.cookie("authToken", token, { secure: true, maxAge: 120000, httpOnly: true });
                    return response;
                }
                return null;
            }
        },
        updateUser: {
            type: UserType,
            args: {
                input: { type: InputUserType }
            },
            resolve: async (_parent, args, { headers }) => await updateUserInfo(headers, {
                username: args.input.username,
                password: args.input.password,
                email: args.input.email,
                bio: args.input.bio,
                image: args.input.image,
            })
        },
        createArticle: {
            type: ArticleType,
            args: {
                input: { type: InputArticleType }
            },
            resolve: async (_parent, args, { headers }) => createArticle(headers, args.input)
        },
        updateArticle: {
            type: ArticleType,
            args: {
                input: { type: InputUpdateArticleType }
            },
            resolve: async (_parent, args, { headers }) => updateArticle(headers, args.input)
        },
        addFavorite: {
            type: ArticleType,
            args: {
                token: { type: GraphQLString },
                slug: { type: GraphQLString }
            },
            resolve: async (_parent, args, { headers }) => await addFavoriteArticle(headers, args.slug)
        },
        removeFavorite: {
            type: ArticleType,
            args: {
                token: { type: GraphQLString },
                slug: { type: GraphQLString }
            },
            resolve: async (_, args, { headers }) => await removeFavoriteArticle(headers, args.slug)
        },
        addComment: {
            type: CommentType,
            args: {
                input: { type: InputCommentType }
            },
            resolve: async (_, args, { headers }) => await addComment(headers, args.input)
        },
        deleteComment: {
            type: DeletedType,
            args: {
                input: { type: DeleteCommentType }
            },
            resolve: async (_, args, { headers }) => await deleteComment(args.input, headers)
        },
        deleteArticle: {
            type: DeletedType,
            args: {
                slug: { type: GraphQLString },
            },
            resolve: async (_, args, { headers }) => await deleteArticle(args.slug, headers)
        },
        followUser: {
            type: ProfileType,
            args: {
                email: { type: GraphQLString },
                username: { type: GraphQLString }
            },
            resolve: async (_, args, { headers }) => await followProfile(headers, args.email, args.username)
        },
        unfollowUser: {
            type: DeletedType,
            args: {
                username: { type: GraphQLString }
            },
            resolve: async (_, args, { headers }) => unfollowProfile(headers, args.username)
        }
    })
})

module.exports = mutation;