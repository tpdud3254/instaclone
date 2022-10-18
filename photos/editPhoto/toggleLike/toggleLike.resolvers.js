import client from "../../../client";
import { protectedResolver } from "../../../users/users.utils";

export default {
    Mutation: {
        toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
            //find photo
            const photo = await client.photo.findUnique({
                where: { id },
            });

            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found.",
                };
            }

            //사진에 좋아요를 했는지 안했는지 체크하고 좋아요가 없을 경우 새로운 좋아요, 있을 경우 좋아요 취소
            const like = await client.like.findUnique({
                where: {
                    photoId_userId: {
                        userId: loggedInUser.id,
                        photoId: id,
                    },
                },
            });

            if (like) {
                await client.like.delete({ where: { id: like.id } }); //댓글 방법

                /*
                니콜라스 방법
                await client.like.delete({
                    where: {
                        photoId_userId: {
                            photoId: id,
                            userId: loggedInUser.id,
                        },
                    },
                });
                */
            } else {
                await client.like.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        photo: {
                            connect: {
                                id: photo.id,
                            },
                        },
                    },
                });

                /*
                댓글에 이렇게 해줘도 잘 작동된다함
                await client.like.create({
                    data: {
                        userId: loggedInUser.id,
                        photoId: id,
                    },
                });
                */
            }
        }),
    },
};
