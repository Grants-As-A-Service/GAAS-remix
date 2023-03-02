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

export const mongoHandler = (promise: Promise<any>) => {
    return new Promise<HTTPSTATUS<any>>((resolve) => {
        promise
            .then((data) => {
                resolve({ status: 200, data });
            })
            .catch((error: MongoServerError) => {
                console.error(error);
                let code = getCode(error.code as number);
                resolve({ status: code, data: error.message });
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
