import { Dispatch, SetStateAction, useReducer, useState } from "react";
import { useRemixStreamLoading, useStreamLoading } from "./useStreamLoading";

export const validEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validPassword = (password: string) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(password);
};

export const useForumValidationRemix = <State>(initState: State, condition: (state: State) => string) => {
    const [error, setError] = useState("");
    const [state, setState] = useState(initState);

    const update = (data: string, key: keyof State) => {
        setState((oldState) => {
            let newState = structuredClone(oldState);
            //@ts-ignore
            newState[key] = data;
            return newState;
        });
    };

    const checkInput = () => {
        let newError = condition(state);
        setError(newError as string);
        return newError;
    };

    const [transition] = useRemixStreamLoading();

    return [update, checkInput, error, setError, transition] as [
        (data: string, key: keyof State) => void,
        () => string,
        string,
        Dispatch<SetStateAction<string>>,
        typeof transition
    ];
};

export const useForumValidation = <State>(initState: State, condition: (state: State) => string, upload: (state: State) => Promise<Response>) => {
    const [error, setError] = useState("");
    const [state, setState] = useState(initState);

    const update = (data: string, key: keyof State) => {
        setState((oldState) => {
            let newState = structuredClone(oldState);
            //@ts-ignore
            newState[key] = data;
            return newState;
        });
    };

    const checkInput = () => {
        let newError = condition(state);
        setError(newError as string);
        return newError;
    };

    const [poster, isFetching] = useStreamLoading(async () => {
        return upload(state);
    });

    const submit = () => {
        if (checkInput() === "") {
            return poster().catch((error) => {
                setError(JSON.stringify(error));
            });
        }
    };

    return [update, submit, error, setError] as [
        (data: string, key: keyof State) => void,
        () => Promise<Response>,
        string,
        Dispatch<SetStateAction<string>>
    ];
};
