import { gql } from "apollo-server";

export default gql`
    type Query {
        seeRooms: [Room]
    }
`;
//Room이 Null이 될 수 있으니 required표시를 하지않는다. (대화방이 없는경우or 사용자가 로그인 하지 않은 경우)
