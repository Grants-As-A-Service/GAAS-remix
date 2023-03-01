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
        async () => {
            setIsFetching(true);

            let res = await requestor();

            setIsFetching(false);

            startTransition(() => {});

            return res;
        },
        isFetching,
    ] as [() => Promise<Response>, boolean];
};
