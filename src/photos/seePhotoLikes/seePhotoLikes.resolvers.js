import client from "../../client";

export default {
    Query: {
        seePhotoLikes: async (_, { id }) => {
            const likes = await client.like.findMany({
                where: {
                    photoId: id,
                },
                select: {
                    user: true,
                },
            });
            return likes.map((like) => like.user);
        },
        // TODO: pagination 추가
        /*
            select와 include의 차이점
            include : 결과에 relationship을 추가
            select : 말 그대로 받고 싶은 데이터를 선택하는 것

            예를 들어 위에 코드에서 select를 하면 only user만 받아오고
            include를 하면 다른 데이터들과 함께 user까지 받아와짐

            당연한 말이지만 select와 include는 동시에 쓸 수 없음
        */
    },
};
