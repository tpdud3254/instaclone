import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
    Mutation: {
        editPhoto: protectedResolver(
            async (_, { id, caption }, { loggedInUser }) => {
                // //find pohoto
                // const photo = await client.photo.findUnique({ where: { id } });

                // //photo 소유자 확인
                // if (photo.userId !== loggedInUser.id) {
                //     return {
                //         ok: false,
                //         error: "Photo not found",
                //     };
                // }

                //find pohoto, photo 소유자 확인 (위 주석 처리된 코드랑 동일한 기능)
                const prevPhoto = await client.photo.findFirst({
                    where: { id, userId: loggedInUser.id },
                    include: {
                        hashtags: { select: { hashtag: true } }, //TODO:왜 이렇게 해댜야되지,,?
                    },
                });

                /*
                이런식으로도 활용 가능 (댓글)
                const oldPhotosHashtags = await client.photo
                    .findFirst({
                        where: {
                            id,
                            userId: loggedInUser.id,
                        },
                        select: {
                            hashtags: true,
                        },
                    })
                    .hashtags({
                        select: {
                            hashtag: true,
                        },
                    });
                */

                if (!prevPhoto) {
                    return {
                        ok: false,
                        error: "Photo not found",
                    };
                }

                //photo update
                await client.photo.update({
                    where: { id },
                    data: {
                        caption,
                        hashtags: {
                            disconnect: prevPhoto.hashtags,
                            connectOrCreate: processHashtags(caption),
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
