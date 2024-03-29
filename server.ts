import * as dotenv from "dotenv";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { authMiddleWare } from "./middleware";
import "./db/mongodb";
import fs from "fs";
import https from "https";
import http from "http";

dotenv.config();

if (!process.env.type) {
	throw new Error("no credentials found, need env");
}

const BUILD_DIR = path.join(process.cwd(), "build");

const app = express();

app.use(compression());

app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.use(authMiddleWare());

app.all(
	"*",
	process.env.NODE_ENV === "development"
		? (req: Request, res: Response, next: NextFunction) => {
				purgeRequireCache();

				return createRequestHandler({
					build: require(BUILD_DIR),
					mode: process.env.NODE_ENV,
				})(req, res, next);
		  }
		: createRequestHandler({
				build: require(BUILD_DIR),
				mode: process.env.NODE_ENV,
		  })
);

const port = process.env.PORT || 3000;

http.createServer(app).listen(port);
https
	.createServer(
		{
			key: fs.readFileSync("key.pem"),
			cert: fs.readFileSync("cert.pem"),
		},
		app
	)
	.listen(443);

function purgeRequireCache() {
	// purge require cache on requests for "server side HMR" this won't let
	// you have in-memory objects between requests in development,
	// alternatively you can set up nodemon/pm2-dev to restart the server on
	// file changes, but then you'll have to reconnect to databases/etc on each
	// change. We prefer the DX of this, so we've included it for you by default
	for (const key in require.cache) {
		if (key.startsWith(BUILD_DIR)) {
			delete require.cache[key];
		}
	}
}
