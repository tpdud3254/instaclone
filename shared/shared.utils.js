import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
//AWS에 로그인 하는 부분

export const uploadToS3 = async (file, userId, folderName) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
        .upload({
            Bucket: "ksy-instaclone-uploads", //bucket name
            Key: objectName, //file name
            ACL: "public-read", //object의 privacy
            Body: readStream, //file (stream)
            // ContentType: "image/jpeg",
        })
        .promise();

    return Location;
};
