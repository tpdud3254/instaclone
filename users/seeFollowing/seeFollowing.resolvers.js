import client from "../../client";

export default {
    Query: {
        seeFollowing: async (__, { userName, lastId }) => {
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

            const following = await client.user
                .findUnique({ where: { userName } })
                .following({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor: { id: lastId } }),
                });

            return {
                ok: true,
                following,
            };
        },
    },
};
