# Architecture
This project is an attempt of understanding how GraphQL work with NodeJS + Express server. What is not here can be opinionated.

![architect-image](./architect.svg)

# Analysis based on this experience

## Strengths
 - The first strength of GraphQL is it **strong type**. This strong typing can be a hindrance during the initial part of development since it slows down the process but later on, it helps prevent wrong data type.
 - Another point that related to the first one is its **data validation**. Thank to the strict typing, graphql supports developer validation during runtime. Many **errors** are also handled by graphql-js library so a lot of try catch blocks might be uncessary.
 - We can **redifine the entity** for a server. This graphql server works as a proxy server for [Conduit api](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md). As an example for this point, we can merge `UserType` and `ProfileType` by combining data received from **Conduit api** when the user query it.

## Weaknesses
- **GraphQL-js** documentation is not very helpful if you build a server. At the moment of this project, most of the docs teaches us how to work with graphQL as a client.
- `Query` function parameters and `Mutation` function parameters are inconsistent. For `Query` we don't need to care about the order of the parameters but it's not the case for `Mutation`. Therefore `GraphQLInputObjectType` comes into existence to solve this problem and this approach is widely adopted.

# Deeper analysis

## Reference