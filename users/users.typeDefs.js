import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        bio: String
        avatar: String
        following: [User]
        followers: [User]
        totalFollowers: Int!
        totalFollowing: Int!
        createdAt: String!
        updatedAt: String!
    }
`;

// isFollowing: Boolean!
// isMe : Boolean!
