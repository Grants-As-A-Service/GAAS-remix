import { init, verifyToken } from "./firebaseAdmin";
import serverconfig from "./server.config.js";
import { NextFunction, Request, Response } from "express";
import { auth, cookieParser } from "./cookies";

const app = init("server");

//check if the path needs auth, to add unrestricted paths check server.config
const pathCheck = (paths: Array<string>, request: Request, auth: () => void, noAuth: () => void) => {
	//check if the requested path is one in server config that allows a connection without auth
	if (paths.some((authorizedPath) => request.path === authorizedPath)) {
		noAuth();
	} else {
		auth();
	}
};

export const authMiddleWare = () => (request: Request, response: Response, next: NextFunction) => {
	pathCheck(
		serverconfig.unAuthAPIRoutes,
		request,
		() => {
			//examine cookie, catch if no cookie or other error
			cookieParser(auth, request.headers.cookie)
				//there is a cookie
				.then((cookie) => {
					//verify the cookie
					verifyToken(app, cookie as string)
						//valid token returns an email
						.then((user) => {
							let { userType } = user;
							//assign user to req header so action methods can fetch
							request.headers["user"] = JSON.stringify(user);
							console.log(user);
							
							//check that the user is not accessing login/register//
							pathCheck(
								serverconfig.unauthorizedURlPaths,
								request,
								() => {
									if (!request.path.split("/")[2] === userType) {
										response.redirect("/home/" + userType);
									}
									if (request.path === "/home") {
										response.redirect("/home/" + userType);
									} else {
										next();
									}
								},
								() => {
									response.redirect("/home");
									response.end();
								}
							);
						})
						//invalid token, delete cookie and go to /
						.catch((error) => {
							console.log(error);
							response.clearCookie("auth");
							response.redirect("/");
							response.end();
						});
				})
				//there is no cookie
				.catch(() => {
					//check not going down auth path, can go to login, register, home
					pathCheck(
						serverconfig.unauthorizedURlPaths,
						request,
						() => {
							response.redirect("/");
							response.end();
						},
						next
					);
				});
		},
		next
	);
};
