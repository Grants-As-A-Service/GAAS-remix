import { json, LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";
import { mongoHandlerThrows } from "~/utils/handler";
import { Form, FormLabel } from "~/components/forms/Form";
import { getGrants } from "db/controllers/grantController";
import { Card } from "~/components/card";
import { getAccount, getAccountId } from "db/controllers/accountController";

export async function loader({ request, params }: LoaderArgs) {
	let { email } = JSON.parse(request.headers.get("user") as string);
	let account = await mongoHandlerThrows<Account>(getAccount(email));

	return json({ account });
}

export default function ProfileView() {
	const { account } = useLoaderData<typeof loader>();

	return (
		<Title title="View Grants" foot="All availible Grants.">
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
