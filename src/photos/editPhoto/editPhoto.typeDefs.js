import { gql } from "apollo-server";

export default gql`
    type Mutation {
        editPhoto(id: Int!, caption: String!): MutationResponse!
    }
`;
// Mutation은 결과값 type을 만들어주면 좋음
