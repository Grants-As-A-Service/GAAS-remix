import { json } from "@remix-run/node";
import { Builder } from "buisnesObjects/builder";
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

export const multiHandler = <T, R>(promiseArray: Array<Promise<R>>): [T, number] => {
    return Promise.all(promiseArray).then((results): Array<HTTPSTATUS<T>> => {
        return results.map((returns): HTTPSTATUS<T> => {
            return returns[0];
        });
    });
};

export const bodyParserHandler = <T>(builder: Builder<T>): T => {
    try {
        let build = builder.build();

        return build;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("body parse issue");
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
