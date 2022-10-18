import { gql } from "apollo-server";

export default gql`
    type Mutation {
        deleteComments(id: Int!): MutationResponse!
    }
`;
