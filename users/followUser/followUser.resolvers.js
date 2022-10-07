import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
    Mutation: {
        followUser: protectedResolver(
            async (__, { userName }, { loggedInUser }) => {
                const ok = await client.user.findUnique({
                    where: { userName },
                });

                if (!ok) {
                    return {
                        ok: false,
                        error: "That user does not exist.",
                    };
                }

                await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        following: {
                            connect: {
                                userName,
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
