require("dotenv").config();
import { ApolloServer } from "apollo-server";
//const { ApolloServer, gql } = require("apollo-server"); //구문법
import schema from "./schema";
import { getUser } from "./users/user.utils";

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        };
    },
});
//context는 변수, 함수가 들어갈 수 있는데 모든 resolver한테 전달해줌

const PORT = process.env.PORT;

server
    .listen(PORT)
    .then(() => console.log(`Server is running on http://localhost:${PORT}`));
