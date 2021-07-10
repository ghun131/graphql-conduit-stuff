# Architecture
This project is an attempt of understanding how GraphQL work with NodeJS + Express server. What is written here can be opinionated.

![architect-image](./architect.svg)

## Strengths
 - The first strength of GraphQL is its **strong typing**. This strength can be a hindrance during the initial part of development since it slows down the process but later on, it helps to prevent wrong type error.
 - Another point that related to the first one is its **data validation**. Thank to the strict typing, graphql supports developer validation during runtime. Many **errors** are also handled by graphql-js library so a lot of try catch blocks might be uncessary.
 - We can **redifine the entity** for a server. This graphql server works as a proxy server for [Conduit api](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md). As an example for this point, we can merge `UserType` and `ProfileType` by combining data received from **Conduit api** when the user query it.
 - One obvious advantage of GraphQL is the ability to select the **right amount of data** that we need. RESTful apis tends to restrict the payload. Normally for extra input, query string can be utilized but extra logic is needed to handle these parameters. On the other hand, with the power of graph language, GraphQL allows the client or whatever services that interact with it the ability to pick the right data and also saves some amount of work for the developer with its reference type.

## Weaknesses
- **GraphQL-js** documentation is not very helpful if you build a server. At the moment of this project, most of the docs teaches us how to work with graphQL as a client.
- `Query` function parameters and `Mutation` function parameters are inconsistent. For `Query` we don't need to care about the order of the parameters but it's not the case for `Mutation`. Therefore `GraphQLInputObjectType` comes into existence to solve this problem and this approach is widely adopted.
- The ability to fetch exactly what you need has its drawback. A complex and nested query can be expensive in term of execution and it leads to **DDos vulnerability**. It seems RESTful has developed many approaches to handle this issue but it's not that well-developed for graphQL
- Most major browsers have built-in **cache** for RESTful api. With GraphQL, we have to do it on our own.
- Arbitrary **handling of error**. GraphQL always return 200 but when it fails, there is an error field in the payload which can be inconvenient

## Reference
- [GraphQL vs REST: which API is best for your web app?](https://www.sanity.io/guides/graphql-vs-rest-api-comparison)
- [REST vs GraphQL APIs, the Good, the Bad, the Ugly](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/)
- [GRAPHQL VS REST: WHICH ONE IS BETTER?](https://www.imaginarycloud.com/blog/graphql-vs-rest/#RESTgood)