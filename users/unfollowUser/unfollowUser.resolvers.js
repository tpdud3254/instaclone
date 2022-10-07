import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
    Mutation: {
        unfollowUser: protectedResolver(
            async (__, { userName }, { loggedInUser }) => {
                const ok = await client.user.findUnique({
                    where: { userName },
                });

                if (!ok) {
                    return {
                        ok: false,
                        error: "Can't unfollow user",
                    };
                }

                await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        following: {
                            disconnect: { userName },
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
