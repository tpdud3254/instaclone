import client from "../client";

export default {
    Photo: {
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
        hashtags: ({ id }) =>
            client.hashtag.findMany({ where: { photos: { some: { id } } } }),
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),
        comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
    },

    Hashtag: {
        photos: ({ id }, { page }) => {
            return client.hashtag
                .findUnique({ where: { id } })
                .photos({ take: 5, skip: (page - 1) * 5 });
        },
        /*
            이제 pagination 기능은 Hashtag속 photos에서 처리 될거임
            이제 hashtag를 불러오는 모든 곳에서는 photos를 받아 올 수 있고 pagimation을 구현했다면 pagination도 사용 가능하게 됨
            사람들이 자주 사용하는 기능은 아님
            seeHashtag내에서 pagination을 구현한 것과는 달리, 코어 부분에 pagination을 구현한 방법임
            우리가 나중에 seeTwoHasgtags라는 query를 만들게 될 경우 photos resolver를 그대로 사용할 수 있다는 거임
        */
        totalPhotos: ({ id }) =>
            //query외에 hashtag같은 어떤 타입 안에서 resoolver field를 작성할때는 parent를 명시해줘야ㄷ함
            client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id,
                        },
                    },
                },
            }),
        /*
            client.hashtag
                .findUnique({
                    where: {
                        id,
                    },
                })
                .photos().length => 이 방법은 추천하지 않음 모든 사진을 불러와야 하기 떄문,*/
    },
};
