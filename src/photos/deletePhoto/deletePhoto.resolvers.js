import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        //TODO: db에 있는 사진도 같이 지우기 https://nomadcoders.co/instaclone/lectures/2462 댓글참고
        deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
            const photo = await client.photo.findUnique({
                where: {
                    id,
                },
                select: {
                    userId: true,
                },
            });

            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found.",
                };
            } else if (photo.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "Not authorized",
                };
            } else {
                await client.photo.delete({ where: { id } });
                return {
                    ok: true,
                };
            }
        }),
    },
};
