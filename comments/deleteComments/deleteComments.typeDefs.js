import { gql } from "apollo-server";

export default gql`
    type DeleteCommentsResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        deleteComments(id: Int!): DeleteCommentsResult
    }
`;
