import { createWriteStream } from "fs";
import client from "../../client";
import bcypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { uploadToS3 } from "../../shared/shared.utils";
const resolverFn = async (
    __,
    {
        firstName,
        lastName,
        userName,
        email,
        password: newPassword,
        bio,
        avatar,
    },
    { loggedInUser }
) => {
    let avatarUrl = null;
    if (avatar) {
        avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");

        // const { filename, createReadStream } = await avatar;
        // const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`; //파일명을 유니크하게 만들어 주기 위해
        // const readStream = createReadStream();
        // const writeStream = createWriteStream(
        //     process.cwd() + "/uploads/" + newFileName
        // );

        // readStream.pipe(writeStream);
        // avatarUrl = `http://localhost:4000/static/${newFileName}`;
    }

    let hashedPassword = null;
    if (newPassword) {
        hashedPassword = await bcypt.hash(newPassword, 10);
    }

    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
        },
    });

    if (updatedUser.id) {
        return {
            ok: true,
        };
    } else {
        return {
            ok: false,
            error: "fail",
        };
    }
};

export default {
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectedResolver(resolverFn), //currying(함수가 함수를 리턴)
    },
};
