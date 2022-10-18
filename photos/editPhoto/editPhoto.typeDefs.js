import { gql } from "apollo-server";

export default gql`
    type EditPhotoResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editPhoto(id: Int!, caption: String!): EditPhotoResult!
    }
`;
// Mutation은 결과값 type을 만들어주면 좋음
