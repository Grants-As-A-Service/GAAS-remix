import { verifyToken } from "../../firebaseAdmin";
import serverconfig from "../../server.config.js";

//this method of auth might be wrong for SSR, got a better idea ? fix it, but this isnt classic client server t

type Fail = (error: any) => any;
type Success = (res?: string) => any;

type Authorize = (request: Request, cookie: string, next: Success, fail: Fail) => void;

//check if the path needs auth, to add unrestricted paths check server.config
const pathWithoutAuth = (request: Request) => {
    let requestType = request.headers.get("sec-fetch-dest");
    console.log(requestType);
    //ensure request is asking for html page and not static content, security flaw here but it works

    if (requestType && requestType === "document") {
        console.log(request.url);
        //check if the requested path is one in server config that allows a connection without auth
        if (serverconfig.unauthorizedURlPaths.some((authorizedPath) => request.url === authorizedPath)) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};

export const authMiddleWare: Authorize = async (request, cookie, next, fail): Promise<any> => {
    if (!pathWithoutAuth(request)) {
        if (cookie) {
            try {
                return next();
                // return next(await verifyToken(cookie));
            } catch (error) {
                console.log(error);
                return fail(error);
            }
        } else {
            return fail("no auth");
        }
    } else {
        return next();
    }
};
