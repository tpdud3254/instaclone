import client from "../../client";

export default {
    Query: {
        searchUsers: (__, { keyword, lastUserId }) =>
            client.user.findMany({
                where: {
                    userName: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
                take: 5,
                skip: lastUserId ? 1 : 0,
                ...(lastUserId && { cursor: { id: lastUserId } }),
            }),
    },
};
