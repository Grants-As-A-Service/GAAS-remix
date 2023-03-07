import { Cookie, createCookie } from "@remix-run/node";

export const cookieParser = (parser: Cookie, cookie: any) => {
    return new Promise((resolve, reject) => {
        parser
            .parse(cookie)
            .then((cookie) => {
                if (cookie) {
                    resolve(cookie);
                } else {
                    reject(null);
                }
            })
            .catch(reject);
    });
};

export const auth = createCookie("auth");
