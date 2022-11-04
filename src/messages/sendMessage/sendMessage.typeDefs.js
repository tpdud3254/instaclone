import { gql } from "apollo-server";

export default gql`
    type Mutation {
        sendMessage(
            payload: String!
            roomId: Int
            userId: Int
        ): MutationResponse!
    }
`;
//roomId, userId이 required가 아닌 이유 : 상대방한테 메세지를 보낼 수도 있고 사용자한테 메세지를 보낼 수도 있다
