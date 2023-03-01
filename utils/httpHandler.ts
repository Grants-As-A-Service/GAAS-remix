export const httpHandlerAlwaysResolve = <T>(promise: Promise<T>) => {
    return new Promise<HTTPSTATUS<T>>((resolve) => {
        promise
            .then((data) => {
                resolve({ status: 200, data });
            })
            .catch((data) => {
                resolve({ status: 500, data });
            });
    });
};


