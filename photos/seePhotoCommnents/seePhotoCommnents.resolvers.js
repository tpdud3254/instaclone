import client from "../../client";

export default {
    Query: {
        seePhotoCommnents: (_, { id }) =>
            client.comment.findMany({
                where: {
                    photoID: id,
                },
                orderBy: {
                    createdAt: "asc",
                },
            }),
        // TODO: pagination 적용
    },
};
