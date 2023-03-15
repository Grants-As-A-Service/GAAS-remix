import { useEffect, useState } from "react";
import router from "~/utils/router";

export const useNavigator = (object: any) => {
	const [updated, setUpdate] = useState(false);

	let states = {};

	for (const [key, value] of Object.entries(object)) {
		const setters = useState(value);
		//@ts-ignore
		states[key] = setters;
	}

	useEffect(() => {
		if (!updated) {
			let oldProps = router.getProps() as any;

			if (oldProps) {
				for (const [key, value] of Object.entries(states)) {
					if (key in oldProps) {
						//@ts-ignore
						value[1](oldProps.user);
					}
				}
			}
			setUpdate(true);
		}
	});

	return [
		states,
		(route: string) => {
			const props = {};
			for (const [key, value] of Object.entries(object)) {
				//@ts-ignore
				props[key] = value[0];
			}
			router.navigateWithProps(route, props);
		},
	];
};

export const useRouter = <T>() => {
	const [updated, setUpdate] = useState(false);
	const [props, setProps] = useState<T | undefined>(undefined);

	useEffect(() => {
		if (!updated) {
			let oldProps = router.getProps() as T;

			if (oldProps) {
				setProps(oldProps);
			}
			setUpdate(true);
		}
	});

	return [props, setProps] as [T | undefined, React.Dispatch<React.SetStateAction<T>>];
};
