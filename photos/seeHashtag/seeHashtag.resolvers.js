import client from "../../client";

export default {
    Query: {
        seeHashtag: (__, { hashtag }) =>
            client.hashtag.findUnique({ where: { hashtag } }),
    },
};
