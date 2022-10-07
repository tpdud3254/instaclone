import client from "../client";

export default {
    User: {
        totalFollowers: ({ id }) =>
            client.user.count({ where: { following: { some: { id } } } }),
        totalFollowing: ({ id }) =>
            client.user.count({ where: { followers: { some: { id } } } }),
    }, //prisma query 그 자체를 리턴할 경우 await를 해주지 않아도 됨
};

// seeProfile() => User를 리턴 받음 => 리턴받은 User에 totalFollowers, totalFollowing가 없다는걸 앎
// => User의 resolver에 totalFollowers, totalFollowing가 있는지 탐색
