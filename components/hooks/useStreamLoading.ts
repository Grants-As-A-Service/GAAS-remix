import { SubmitFunction, useSubmit, useActionData, useTransition } from "@remix-run/react";
import { useState, Ref, useTransition as useReactTransition } from "react";

//figure out how streaming -> suspense works

export const useRemixStreamLoading = <T>() => {
    const transition = useTransition();

    return [transition] as [typeof transition];
};
// [useActionData<T>(), useTransition(), useSubmit()] as [T, [boolean, React.TransitionStartFunction], SubmitFunction];
type PostRequestor = () => Promise<Response>;

export const useStreamLoading = (requestor: PostRequestor) => {
    const [isPending, startTransition] = useReactTransition();
    const [isFetching, setIsFetching] = useState(false);

    return [
        () => {
            setIsFetching(true);
            return new Promise((resolve, reject) => {
                requestor()
                    .then(async (res) => {
                        setIsFetching(false);
                        startTransition(() => {});

                        if (!res.ok) {
                            console.log(res);

                            console.log(await res.text())
                            console.log(await res.json())
                            console.log(res)

                            reject(res.headers.get("Status"));
                        } else {
                            resolve(res);
                        }
                    })
                    .catch(reject);
            });
        },
        isFetching,
    ] as [() => Promise<Response>, boolean];
};
