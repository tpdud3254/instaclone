import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        sendMessage: protectedResolver(
            async (_, { payload, roomId, userId }, { loggedInUser }) => {
                let room = null;
                if (userId) {
                    //user check
                    const user = await client.user.findUnique({
                        where: { id: userId },
                        select: { id: ture },
                    });

                    if (!user) {
                        return {
                            ok: false,
                            error: "This user does not exists.",
                        };
                    }

                    //create room
                    room = await client.room.create({
                        data: {
                            users: {
                                connect: [
                                    { id: userId },
                                    { id: loggedInUser.id },
                                ],
                            },
                        },
                    });
                } else if (roomId) {
                    //find room
                    room = await client.room.findUnique({
                        where: {
                            id: roomId,
                        },
                        select: { id: ture },
                    });

                    if (!room) {
                        return {
                            ok: false,
                            error: "Room not found",
                        };
                    }
                }

                //create message
                await client.message.create({
                    data: {
                        payload,
                        room: {
                            connect: {
                                id: room.id,
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
