import client from "../client";

export default {
    Photo: {
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
        hashtags: ({ id }) =>
            client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    },

    Hashtag: {
        photos: ({ id }, { page }) => {
            return client.hashtag
                .findUnique({ where: { id } })
                .photos({ take: 5, skip: (page - 1) * 5 });
        },
        totalPhotos: ({ id }) =>
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
