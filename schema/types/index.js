const { GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLNonNull } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        image: { type: GraphQLString },
        token: { type: GraphQLString },
    })
})

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        image: { type: GraphQLString },
        following: { type: GraphQLBoolean }
    })
})

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        body: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        udpatedAt: { type: GraphQLString },
        description: { type: GraphQLString },
        author: { type: ProfileType },
        tagList: { type: new GraphQLList(GraphQLString) },
        favorited: { type: GraphQLBoolean },
        favoritesCount: { type: GraphQLInt }
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { type: ProfileType }
    })
})

const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        tags: { type: new GraphQLList(GraphQLString) }
    })
})

const DeletedType = new GraphQLObjectType({
    name: 'Deleted',
    fields: () => ({
        message: { type: GraphQLString }
    })
})

const InputUserType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        bio: { type: GraphQLString },
        image: { type: GraphQLString },
    })
})

const InputArticleType = new GraphQLInputObjectType({
    name: 'ArticleInput',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        body: { type: GraphQLString },
        tagList: { type: new GraphQLList(GraphQLString) }
    })
})

const InputUpdateArticleType = new GraphQLInputObjectType({
    name: 'UpdateArticleInput',
    fields: () => ({
        slug: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        body: { type: GraphQLString },
        tagList: { type: new GraphQLList(GraphQLString) }
    })
})

const InputCommentType = new GraphQLInputObjectType({
    name: 'AddCommentType',
    fields: () => ({
        slug: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLString },
    })
})

const DeleteCommentType = new GraphQLInputObjectType({
    name: 'DeleteCommentType',
    fields: () => ({
        slug: { type: new GraphQLNonNull(GraphQLString) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
    })
})

module.exports = {
    UserType,
    ProfileType,
    ArticleType,
    CommentType,
    TagType,
    InputUserType,
    InputArticleType,
    InputUpdateArticleType,
    InputCommentType,
    DeleteCommentType,
    DeletedType
}