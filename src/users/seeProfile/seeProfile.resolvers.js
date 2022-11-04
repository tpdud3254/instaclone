import client from "../../client";

export default {
    Query: {
        seeProfile: (__, { userName }) =>
            client.user.findUnique({
                where: {
                    userName,
                },
                // include: {
                //     following: true,
                //     followers: true,
                // },
                //include : 너가 원하는 사용자 관계를 가지고 올 수 있게 해줌
            }),
    },
};
