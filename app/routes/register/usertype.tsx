import { useFetcher, useOutletContext } from "@remix-run/react";
import { setClaims, init } from "../../lib/firebaseAdmin.server";
import { UserContextADT } from "~/routes/register";
import { setUserType } from "~/utils/firebaseClient";
import { getAccountId } from "db/controllers/accountController";
import { mongoHandlerThrows } from "~/utils/handler";

export async function action({ request }: { request: Request }) {
	let { userType, email, uid } = await request.json();

	const app = init(Math.random().toString()); //lets pretend we both didnt see this

	let accountID = await mongoHandlerThrows(getAccountId(email));

	await setClaims(app, uid, userType, accountID);
	
	app.delete();
	
	return new Response(null);
}

export default function UserType() {
	const { setType, user } = useOutletContext<UserContextADT>();

	const submitTypeFirebase = async (type: UserType) => {
		await setUserType((uid) => {
			return fetch("/register/usertype", {
				method: "post",
				body: JSON.stringify({ userType: type, uid, email: user?.email }),
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
