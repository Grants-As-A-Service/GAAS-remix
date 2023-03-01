import { MongooseError } from "mongoose";

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
