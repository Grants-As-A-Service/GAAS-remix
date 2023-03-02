import { verifyToken } from "./firebaseAdmin";
import serverconfig from "./server.config.js";
import { NextFunction, Request, Response } from "express";
import { auth } from "./cookies";

//check if the path needs auth, to add unrestricted paths check server.config
const pathWihoutAuth = (request: Request) => {
    let requestType = request.headers["sec-fetch-dest"];
    //ensure request is asking for html page and not static content, security flaw here but it works

    if (requestType && requestType === "document") {
        //check if the requested path is one in server config that allows a connection without auth
        if (serverconfig.unauthorizedURlPaths.some((authorizedPath) => request.path === authorizedPath)) {
            return true;
        } else {
            return false;
        }
    }
    return true;
};

export const authMiddleWare = (request: Request, response: Response, next: NextFunction) => {
    if (pathWihoutAuth(request)) {
        next();
    } else {
        const fail = () => {
            console.log("failed");
            response.clearCookie("auth");
            response.redirect("/");
            response.end();
        };

        auth.parse(request.headers.cookie as string)
            .then((cookie) => {
                if (cookie) {
                    verifyToken(cookie)
                        .then(() => {
                            next();
                        })
                        .catch((error) => {
                            console.log(error);
                            fail();
                        });
                } else {
                    fail();
                }
            })
            .catch((_) => fail());
    }
};
