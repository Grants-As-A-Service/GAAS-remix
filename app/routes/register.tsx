import { createContext, useCallback, useEffect, useState } from "react";

import { Outlet } from "@remix-run/react";
import router from "~/utils/router";

export type UserContextADT = {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	type: UserType | undefined;
	setType: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

//this got completelty fucking ridiculous
export default function Register() {
	const [user, setUser] = useState<User | undefined>();
	const [type, setType] = useState<UserType | undefined>();
	const [updated, setUpdate] = useState(false);

	useEffect(() => {
		if (!updated) {
			let oldProps = router.getProps() as any;
			if (oldProps) {
				if ("user" in oldProps) {
					setUser(oldProps.user);
				}
				if ("type" in oldProps) {
					setType(oldProps.type);
				}
			}
			setUpdate(true);
		} else {
			let props = { type, user };
			if (user && type) {
				let route = type === "buisness" ? "/register/buisness" : "/register/government"
				router.navigateWithProps("/register/buisness", props);
			}
			if (!user && !type && router.current() !== "/register/user") {
				router.navigateWithProps("/register/user", props);
			}
			if (user && !type && router.current() !== "/register/usertype") {
				router.navigateWithProps("/register/usertype", props);
			}
		}
	});

	return (
		<div className="w-full h-full base-100">
			<div className="w-full flex flex-col justify-center content-center">
				<div className="w-full flex flex-row gap-20 p-10 justify-center">
					<Outlet context={{ buisness, setBuisness, type, setType, user, setUser }} />
				</div>
			</div>
		</div>
	);
}
