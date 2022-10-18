export const processHashtags = (caption) => {
    const hashtags = caption.match(/#[\w]+/g) || [];
    return hashtags.map((hashtag) => {
        return {
            where: { hashtag },
            create: { hashtag },
        };
    });
};
