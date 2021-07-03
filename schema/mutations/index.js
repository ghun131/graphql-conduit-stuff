const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const { registerUser, login, updateUserInfo } = require('../../model/auth');
const { UserType, InputUserType } = require('../types');


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
        }
    })
})

module.exports = mutation;