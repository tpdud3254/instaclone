import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        createComment: protectedResolver(
            async (_, { photoId, payload }, { loggedInUser }) => {
                const ok = await client.photo.findUnique({
                    where: {
                        id: photoId,
                    },
                    select: {
                        id: true,
                    }, //photo의 id만!!! 가져오기
                });

                if (!ok) {
                    return {
                        ok: false,
                        error: "Photo not found.",
                    };
                }

                await client.comment.create({
                    data: {
                        payload,
                        photo: {
                            connect: {
                                id: photoId,
                            },
                        },
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                    },
                });

                return {
                    ok: true,
                };
            }
        ),
    },
};
