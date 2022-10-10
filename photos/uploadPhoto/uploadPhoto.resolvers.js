import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (__, { file, caption }, { loggedInUser }) => {
                let hashtagObj = [];

                if (caption) {
                    // parse caption
                    // regural expression (정규 표혀식) : 패턴을 통해 String내에 있는 특정 stringa을 추출하도록 도와주는 것 (https://www.regexpal.com/)
                    const hashtags = caption.match(/#[\w]+/g);
                    hashtagObj = hashtags.map((hashtag) => {
                        return {
                            where: { hashtag },
                            create: { hashtag },
                        };
                    });
                }

                // get or create hashtags
                // save the photo with the parsed hashtags
                // add the photo to the hasgtags
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            },
                        }),
                    },
                });
            }
        ),
    },
};
