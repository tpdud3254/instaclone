import client from "../../client";
import bcypt from "bcrypt";
import { protectedResolver } from "../user.utils";

const resolverFn = async (
    __,
    { firstName, lastName, userName, email, password: newPassword, bio },
    { loggedInUser, protectResolver }
) => {
    protectResolver(loggedInUser);

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
    Mutation: {
        editProfile: protectedResolver(resolverFn), //currying(함수가 함수를 리턴)
    },
};
