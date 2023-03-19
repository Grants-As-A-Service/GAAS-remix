import { json, LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";
import { mongoHandlerThrows } from "~/utils/handler";
import { Form, FormLabel } from "~/components/forms/Form";
import { getGrants } from "db/controllers/grantController";
import { Card } from "~/components/card";

export async function loader({ request, params }: LoaderArgs) {
	const url = new URL(request.url);
	const profile = JSON.parse(url.searchParams.get("props") as string) as Account & ID;
	let profileView = await mongoHandlerThrows(getAccount(profile._id));

	return json({ profileView });
}

export default function ProfileView() {
	const { profile } = useLoaderData<typeof loader>();

	return (
		<Title title="View Grants" foot="All availible Grants.">
			<h1 className="font-title mb-2 text-2xl pt-6">Profile</h1>
			<div className="flex flex-row flex-wrap w-full gap-5 pt-4">
                <Form>
                    <h1>{profile.name}</h1>
                    <h3 className="font-title mb-2 text-lg">{profile.email}</h3>
                    <h3 className="font-title mb-2 text-lg">{profile.phone}</h3>
                </Form>
			</div>	
		</Title>
	);
}