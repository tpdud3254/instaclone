import client from "../../client";

export default {
    Query: {
        //TODO: pagination 추가
        searchPhotos: (__, { keyword }) =>
            client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword,
                    },
                },
            }),
    },
};
