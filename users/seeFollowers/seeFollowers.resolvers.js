import client from "../../client";

export default {
    Query: {
        //offset pagination
        seeFollowers: async (__, { userName, page }) => {
            const ok = await client.user.findUnique({
                where: { userName },
                select: { id: true },
            });

            if (!ok) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }
            //팔로워 목록 조회 두가지 방법
            //첫번째 방법 : 단점은 팔로워가 엄청나게 많을 경우 데이터베이스에 과부하가 걸릴 수 있다는 점임
            //'나'의 팔로워 들을 찾는 방법
            const followers = await client.user
                .findUnique({
                    where: { userName },
                })
                .followers({
                    take: 5,
                    skip: (page - 1) * 5,
                });

            const totalFollowers = await client.user.count({
                where: { following: { some: { userName } } },
            });

            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            };

            //두번째 방법
            //팔로잉 목록에 '내'가 있는 사람들을 찾는 방법
            // const bFollowers = await client.user.findMany({
            //     where: {
            //         following: {
            //             some: {
            //                 userName,
            //             },
            //         },
            //     },
            // });
        },
    },
};
