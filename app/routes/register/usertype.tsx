import { useFetcher, useOutletContext } from "@remix-run/react";
import { setType, init } from "../../lib/firebaseAdmin.server";
import { UserContextADT } from "~/routes/register";
import { setUserType } from "~/utils/firebaseClient";

export async function action({ request }: { request: Request }) {
	let { userType, uid } = await request.json();

	let admin = init("remix");

	await setType(admin, uid, userType);

	await admin.delete();

	return new Response(null);
}

export default function UserType() {
	const { setType } = useOutletContext<UserContextADT>();

	const submitTypeFirebase = async (type: UserType) => {
		await setUserType((uid) => {
			return fetch("/register/usertype", {
				method: "post",
				body: JSON.stringify({ userType: type, uid }),
			});
		});
		setType(type);
	};

	return (
		<div className="w-full flex flex-col text-center">
			<h1 className="font-title mb-14 text-4xl font-extrabold sm:text-1xl lg:text-1xl">Pick a user type</h1>
			<div className="w-full flex flex-row justify-center gap-10">
				<button className="btn btn-primary" onClick={() => submitTypeFirebase("buisness")}>
					Buisness Owner
				</button>
				<button className="btn btn-primary" onClick={() => submitTypeFirebase("government")}>
					Government Employee
				</button>
			</div>
		</div>
	);
}
