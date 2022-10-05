import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (
            __,
            { firstName, lastName, userName, email, password }
        ) => {
            try {
                // Check if userName or email are already on DB.
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [{ userName }, { email }],
                    },
                });

                if (existingUser) {
                    throw new Error(
                        "This user name or email is already taken."
                    );
                }

                //hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                //save and return the user
                // return client.user.create({
                //     data: {
                //         firstName,
                //         lastName,
                //         userName,
                //         email,
                //         password: hashedPassword,
                //     },
                // }); 위 리턴문이랑 아래 코드랑 똑같음

                const createdUser = await client.user.create({
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        password: hashedPassword,
                    },
                });

                if (createdUser.id) {
                    return {
                        ok: true,
                    };
                } else {
                    throw new Error("fail");
                }
            } catch (error) {
                return {
                    ok: false,
                    error,
                };
            }
        },
    },
};
