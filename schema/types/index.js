const { GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        image: { type: GraphQLString },
        token: { type: GraphQLString },
    }
})

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        image: { type: GraphQLString },
        following: { type: GraphQLBoolean }
    }
})

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: {
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        body: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        udpatedAt: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: ProfileType },
        tagList: { type: new GraphQLList(GraphQLString) },
        favourited: { type: GraphQLBoolean },
        favouritesCount: { type: GraphQLInt }
    }
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { type: ProfileType }
    }
})

const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: {
        tags: { type: new GraphQLList(GraphQLString) }
    }
})

module.exports = {
    UserType,
    ProfileType,
    ArticleType,
    CommentType,
    TagType
}