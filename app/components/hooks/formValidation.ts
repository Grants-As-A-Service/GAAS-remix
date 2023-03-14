import { Dispatch, SetStateAction, useReducer, useState } from "react";
import { responseHandler } from "~/utils/httpHandler";

export const validEmail = (email: string) => {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validPassword = (password: string) => {
	return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(password);
};

export const useFormValidationPost = <State>(initState: State, condition: (state: State) => string | undefined, upload: (state: State) => Promise<Response>) => {
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

	const submit = () => {
		if (checkInput() === "") {
			return new Promise((resolve, reject) => {
				responseHandler(upload(state))
					.then(resolve)
					.catch((error: Response) => {
						setError(error.statusText);
						reject(error);
					});
			});
		}
	};

	return [update, submit, error, setError] as [(data: string, key: keyof State) => void, () => Promise<Response>, string, Dispatch<SetStateAction<string>>];
};

export const useFormValidation = <State>(initState: State, condition: (state: State) => string | undefined, done: (state: State) => void) => {
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

	const submit = () => {
		if (checkInput() !== undefined) {
			done(state);
		}
	};

	return [update, error, setError, submit] as [(data: string, key: keyof State) => void, string, Dispatch<SetStateAction<string>>, typeof submit];
};
