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
	let grants = await mongoHandlerThrows(getGrants());

	return json({ grants });
}

export default function GrantView() {
	const { grants } = useLoaderData<typeof loader>();

	return (
		<Title title="View Grants" foot="All availible Grants.">
			<h1 className="font-title mb-2 text-2xl pt-6">Grants</h1>
			<div className="flex flex-row flex-wrap w-full gap-5 pt-4">
				{grants.map((grant: Grant) => {
					return (
						<div>
							<h3 className="font-title mb-2 text-lg">{grant.creator}</h3>
							<h1>{grant.title}</h1>
							<div className="pb-5" />
							<textarea
								className="textarea textarea-primary"
								disabled
								placeholder="This project is..."
								value={grant.description}
								onChange={(e) => {}}
							/>
                            <>
                                {grant.tags.map((tag: String) => {
                                    <h3 className="font-title mb-2 text-lg">{tag}</h3>
                                })}
                            </>
						</div>
					);
				})}
			</div>	
		</Title>
	);
}