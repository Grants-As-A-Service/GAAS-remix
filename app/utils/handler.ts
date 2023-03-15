import { json } from "@remix-run/node";
import { Builder } from "buisnessObjects/builder";
import { MongoServerError } from "mongodb";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

const HttpMongoCodes = {
	11000: 409,
};

const getCode = (mongoCode: number) => {
	//@ts-ignore
	let code = HttpMongoCodes[mongoCode];

	return code ? code : 500;
};

export const responseHandler = (promise: Promise<Response>): Promise<Response> => {
	return new Promise<Response>((resolve, reject) => {
		promise.then((response) => {
			if (!response.ok) {
				reject(response);
			} else {
				resolve(response);
			}
		});
	});
};

export const mongoHandlerThrows = async <T>(promise: Promise<T>) => {
	try {
		return await promise;
	} catch (error) {
		throw json((error as MongoServerError).code);
	}
};

export const mongoHandler = <T>(promise: Promise<T>) => {
	return new Promise<HTTPSTATUS<T>>((resolve) => {
		promise
			.then((data) => {
				resolve([data, 200]);
			})
			.catch((error: MongoServerError) => {
				console.error(error);
				let code = getCode(error.code as number);
				resolve([null as T, code]);
			});
	});
};

export const multiHandlerThrows = <T>(promiseArray: Array<Promise<any>>): Promise<T> => {
	return mongoHandlerThrows<T>(
		//@ts-ignore
		Promise.all(promiseArray)
	);
};

export const multiHandler = <T>(promiseArray: Array<Promise<any>>): Promise<HTTPSTATUS<T>> => {
	return mongoHandler<T>(
		//@ts-ignore
		Promise.all(promiseArray)
	);
};

export const bodyParserHandler = <T>(builder: Builder<T>): T => {
	try {
		let build = builder.build();

		return build;
	} catch (error) {
		if (error instanceof ZodError) {
			console.error("body parse issue", error);
		} else {
			console.log(error);
		}
		throw json(null, { status: 500 });
	}
};

export const pathNameSlicer = (pathName: string) => {
	let path = pathName.split("/");
	return "/" + path.splice(3, path.length).join("/");
};
