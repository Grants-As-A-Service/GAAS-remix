import { json } from "@remix-run/node";
import { Builder } from "buisnesObjects/builder";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

export const mongoHandler = (promise: Promise<any>) => {
    return new Promise<HTTPSTATUS<any>>((resolve) => {
        promise
            .then((data) => {
                resolve({ status: 200, data });
            })
            .catch((error: MongooseError) => {
                console.error(error.stack);

                resolve({ status: 500, data: error.message });
            });
    });
};

export const bodyParserHandler = <T>(builder: Builder<T>): T => {
    try {
        let build = builder.build();

        return build;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("body parse issue", error.issues);
        } else {
            console.log(error);
        }
        throw json(null, { status: 500 });
    }
};
