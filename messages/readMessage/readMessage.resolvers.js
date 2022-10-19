import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
            /* 
                1. 내가 그 대화방에 있고 
                2. 내가 그 메세지를 보낸 사용자가 아닐 경우
                3. 내가 그 메세지가 보내진 걸 알고있을 때 
                메세지 읽음 표시를 할 수 있음
            */
            const message = await client.message.findFirst({
                where: {
                    id,
                    userId: {
                        not: loggedInUser.id,
                    },
                    room: {
                        users: {
                            some: {
                                id: loggedInUser.id,
                            },
                        },
                    },
                },
                select: {
                    id: true,
                },
            });

            if (!message) {
                return {
                    ok: false,
                    error: "Message not found.",
                };
            }

            await client.message.update({
                where: {
                    id,
                },
                data: {
                    read: true,
                },
            });

            return {
                ok: true,
            };
        }),
    },
};
