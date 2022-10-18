import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhotoCommnents(id: Int!): [Comment]
    }
`;
