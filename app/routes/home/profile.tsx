import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Title } from "~/components/title";
import { mongoHandlerThrows } from "~/utils/handler";
import { Form } from "~/components/forms/Form";
import { getAccount } from "db/controllers/accountController";

export async function loader({ request, params }: LoaderArgs) {
	let { email } = JSON.parse(request.headers.get("user") as string);
	let account = await mongoHandlerThrows<Account>(getAccount(email));

	return json({ account });
}

export default function ProfileView() {
	const { account } = useLoaderData<typeof loader>();

	return (
		<Title title={account.name} foot="User Profile">
			<h1 className="font-title mb-2 text-2xl pt-6">Profile</h1>
			<div className="flex flex-row flex-wrap w-full gap-5 pt-4">
				<Form>
					<h1>{account.name}</h1>
					<h3 className="font-title mb-2 text-lg">{account.email}</h3>
					<h3 className="font-title mb-2 text-lg">{account.phone}</h3>
				</Form>
			</div>
		</Title>
	);
}
