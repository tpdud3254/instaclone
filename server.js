require("dotenv").config();
import { ApolloServer } from "apollo-server";
//const { ApolloServer, gql } = require("apollo-server"); //구문법
import schema from "./schema";

const server = new ApolloServer({
    schema,
});

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}`));
