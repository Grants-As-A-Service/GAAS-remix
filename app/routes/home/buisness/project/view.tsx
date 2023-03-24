import { json, LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";
import { mongoHandlerThrows } from "~/utils/handler";
import { getCreatedGrants, getGrantById } from "db/controllers/grantController";
import { Form, FormLabel } from "~/components/forms/Form";
import { getTags } from "db/controllers/tagController";
import { getGrantMatchesByProject } from "db/controllers/grantProjectController";

export async function loader({ request, params }: LoaderArgs) {
	const url = new URL(request.url);
	const project = JSON.parse(url.searchParams.get("props") as string) as Project & ID;
	let tags = await mongoHandlerThrows(getTags(project._id));
	let projectGrants = await mongoHandlerThrows(getGrantMatchesByProject(project._id.toString())) as GrantProject[];
	const matchedGrants = [] as Grant[];

	for (let projectGrant of projectGrants) {
		const grant = await mongoHandlerThrows(getGrantById(projectGrant.grantId));
		matchedGrants.push(grant);
	}

	return json({ project, tags, matchedGrants });
}

export default function ProjectView() {
	const { project, tags, matchedGrants } = useLoaderData<typeof loader>();
	
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
			<h2 className="font-title mb-2 text-3xl pt-6">Matched Grants</h2>
			<div className="flex flex-row flex-wrap w-full gap-5 pt-4">
				{matchedGrants.length == 0 ? <p>No grant matches yet. Check back soon!</p> : matchedGrants.map((grant) => {
					return <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<a href="#">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{grant.title}</h5>
					</a>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{grant.description}</p>
					<h3 className="font-title mb-2 text-xl pt-6">${grant.value.toLocaleString()}</h3>
					<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Apply
						<svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					</a>
				</div>
				})}
			</div>
		</Title>
	);
}
