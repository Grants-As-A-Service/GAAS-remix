import { json, LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";
import { mongoHandlerThrows } from "~/utils/handler";
import { getCreatedGrants } from "db/controllers/grantController";
import { Form, FormLabel } from "~/components/forms/Form";
import { getTags } from "db/controllers/tagController";

export async function loader({ request, params }: LoaderArgs) {
	const url = new URL(request.url);
	const project = JSON.parse(url.searchParams.get("props") as string) as Project & ID;
	let tags = await mongoHandlerThrows(getTags(project._id));

	return json({ project, tags });
}

export default function ProjectView() {
	const { project, tags } = useLoaderData<typeof loader>();

	console.log(tags);

	return (
		<Title title={project.name} foot={project.description}>
			<p>Currently: {project.status}</p>
			<h1 className="font-title mb-2 text-2xl pt-6">Tags</h1>
			<div className="flex flex-row flex-wrap w-full gap-5 pt-4">
				{tags.map((tag: Tag) => {
					return (
						<Form customWidth="max-w-sm">
							<h3 className="font-title mb-2 text-lg">{tag.name}</h3>
							<FormLabel>Strength</FormLabel>
							<input type="range" min="0" max="10" value={tag.quantifier} onChange={(e) => {}} disabled className="range range-primary" />
							<div className="pb-5" />
							<textarea
								className="textarea textarea-primary"
								disabled
								placeholder="This project is..."
								value={tag.description}
								onChange={(e) => {}}
							/>
						</Form>
					);
				})}
			</div>
			
		</Title>
	);
}
