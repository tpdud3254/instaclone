import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

//팔로워 목록에 내 이름이 있는 유저들의 photo를 찾으면 됨

export default {
    Query: {
        seeFeed: protectedResolver(
            (_, { offset }, { loggedInUser }) =>
                client.photo.findMany({
                    where: {
                        OR: [
                            {
                                user: {
                                    followers: {
                                        some: { id: loggedInUser.id },
                                    },
                                },
                            },
                            {
                                userId: loggedInUser.id, //피드에 내 사진도 뜨기 떄문
                            },
                        ],
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 2,
                    skip: offset,
                    // skip: lastId ? 1 : 0,
                    // ...(lastId && { cursor: { id: lastId } }),
                }) //TODO: pagination 추가
        ),
    },
};
