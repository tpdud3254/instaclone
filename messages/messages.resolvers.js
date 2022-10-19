import client from "../client";

export default {
    Room: {
        users: ({ id }) => client.room.findUnique({ where: { id } }).users(), // 유저가 많아 질 경우에는 부적합한 방법이긴함
        messages: ({ id }) =>
            client.message.findMany({
                where: {
                    roomId: id,
                },
            }),
        //TODO: pagination 추가
        //위에 방법 둘다 똑같은데 밑에는 pagination을 할 수 있음
        unreadTotal: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return 0;
            }

            return client.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id,
                        },
                    },
                },
                //읽지 않고, 대화하는 방에, 내가 보낸 메세지가 아닌 경우에..
            });
        },
    },
    Message: {
        user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
        //TODO: 삭제기능도 구현할수있음
    },
};
