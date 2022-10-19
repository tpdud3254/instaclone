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
        unreadTotal: () => 0,
    },
};
