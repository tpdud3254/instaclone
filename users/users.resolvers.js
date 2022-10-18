import client from "../client";

export default {
    User: {
        totalFollowers: ({ id }) =>
            client.user.count({ where: { following: { some: { id } } } }),
        totalFollowing: ({ id }) =>
            client.user.count({ where: { followers: { some: { id } } } }),
        //prisma query 그 자체를 리턴할 경우 await를 해주지 않아도 됨
        isMe: ({ id }, __, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }

            return id === loggedInUser.id;

            // 아래와 동일
            // return id === loggedInUser?.id
        },
        isFollowing: async ({ id }, __, { loggedInUser }) => {
            if (!loggedInUser || id === loggedInUser.id) {
                return false;
            }

            const exists = await client.user
                .findUnique({ where: { userName: loggedInUser.userName } })
                .following({ where: { id } });

            return exists.length !== 0;

            //이런식으로 해줘도 됨
            // const exists = await client.user.count({
            //     where: {
            //         userName: loggedInUser.userName,
            //         following: { some: { id } },
            //     },
            // });

            // return Boolean(exists)
        },
        photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(), //pagenation 추가
    },
};

// seeProfile() => User를 리턴 받음 => 리턴받은 User에 totalFollowers, totalFollowing가 없다는걸 앎
// => User의 resolver에 totalFollowers, totalFollowing가 있는지 탐색

//totalFollowers, totalFollowing, isMe -> 누가 이 resolver를 호출했는지 알아야되기 때문에 root를 사용
