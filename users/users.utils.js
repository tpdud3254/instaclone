import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }

        const { id } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findUnique({
            where: {
                id,
            },
        });

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

//function-oriented programming, functional programming
export const protectedResolver = (resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        /*
        seefeed 같은 경우는 반환값으로 [Photo]를 예상하고 있으니 ok, error를 반환하면 에러가남
        방어코드
        */
        const query = info.operation.operation === "query";
        if (query) {
            return null;
        } else {
            return {
                ok: false,
                error: "Please login to perform this action",
            };
        }
    }
    return resolver(root, args, context, info);
};
// 위 함수랑 똑같음
// export function protectedResolver(resolver) {
//     return function (root, args, context, info) {
//         if (!context.loggedInUser) {
//             return {
//                 ok: false,
//                 error: "Please login to perform this action",
//             };
//         }
//         return resolver(root, args, context, info);
//     };
// }
