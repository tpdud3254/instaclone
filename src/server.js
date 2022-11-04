require("dotenv").config();
// import { ApolloServer } from "apollo-server";
//const { ApolloServer, gql } = require("apollo-server"); //구문법
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

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

const PORT = process.env.PORT;

async function startServer() {
    //apllo server는 할수 있는게 제한적이라서 express server를 만들고 apollo server에 추가할거임
    const app = express();
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });
    const serverCleanup = useServer(
        {
            schema,
            context: async (param) => {
                if (!param.connectionParams?.token) {
                    throw new Error("You can't listen.");
                }
                return {
                    loggedInUser: await getUser(param.connectionParams.token),
                };
            },
        },
        wsServer
    );

    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        introspection: true,
        context: async (ctx) => {
            return {
                loggedInUser: await getUser(ctx.req.headers.token),
            };
            // } else {
            // }
        },
        csrfPrevention: false,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });

    await apollo.start();

    app.use(graphqlUploadExpress());
    app.use("/static", express.static("uploads")); //uploads폴더를 인터넷에 올림

    apollo.applyMiddleware({ app });

    await new Promise((r) => httpServer.listen(PORT, r));

    console.log(
        `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
    );
}

startServer();
