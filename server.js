require("dotenv").config();
// import { ApolloServer } from "apollo-server";
//const { ApolloServer, gql } = require("apollo-server"); //구문법
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: async ({ req }) => {
//         return {
//             loggedInUser: await getUser(req.headers.token),
//         };
//     },
// });
// //context는 변수, 함수가 들어갈 수 있는데 모든 resolver한테 전달해줌

// const PORT = process.env.PORT;

// server
//     .listen(PORT)
//     .then(() => console.log(`Server is running on http://localhost:${PORT}`));

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token),
            };
        },
        csrfPrevention: true,
    });

    await server.start();

    const app = express();

    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress());

    server.applyMiddleware({ app });

    await new Promise((r) => app.listen({ port: 4000 }, r));

    console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
}

startServer();
