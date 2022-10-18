import { gql } from "apollo-server";

/*
Like를 만드는 이유? 

photo에 like항목을 그냥 추가하게 되면 우린 유저가 좋아요 누른 사진들을 모아 볼 수도 없을뿐더러
어떤 유저가 좋아요를 눌렀는지 볼 수 없게 됨
*/
export default gql`
    type ToggleLikeResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        toggleLike(id: Int!): ToggleLikeResult!
    }
`;
