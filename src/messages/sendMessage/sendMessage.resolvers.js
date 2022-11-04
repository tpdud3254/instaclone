import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { getUser, protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        sendMessage: protectedResolver(
            async (_, { payload, roomId, userId }, { loggedInUser, token }) => {
                //TODO: 서로 팔로우중인지 아님 한쪽만 팔로우 중인지 체크도 해볼 수 있음
                let room = null;
                if (userId) {
                    //user check
                    const user = await client.user.findUnique({
                        where: { id: userId },
                        select: { id: true },
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
                        select: { id: true },
                    });

                    if (!room) {
                        return {
                            ok: false,
                            error: "Room not found",
                        };
                    }
                }

                //create message
                const message = await client.message.create({
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

                pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
                return {
                    ok: true,
                    id: message.id,
                };
            }
        ),
    },
};
