import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (__, { userName, password }) => {
            // Find user with args.userName
            const user = await client.user.findFirst({ where: { userName } });
            // 조건에 맞는 첫번째 사용자(결과)를 리턴
            if (!user) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }

            // Check password with args.password
            const passwordOk = bcrypt.compare(password, user.password);

            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password.",
                };
            }

            // Issue a token and send it to the user
            const token = await jwt.sign(
                { id: user.id },
                process.env.SECRET_KEY
            );

            return {
                ok: true,
                token,
            };
        },
    },
};
