import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGrantMatchesByGrant } from "db/controllers/grantProjectController";
import { getProject } from "db/controllers/projectController";
import { useState } from "react";
import { useRouter } from "~/components/hooks/navigator";
import { Title } from "~/components/title";
import { mongoHandlerThrows } from "~/utils/handler";

export async function loader({ request, params }: LoaderArgs) {
	const url = new URL(request.url);
	const grant = JSON.parse(url.searchParams.get("props") as string) as Grant & ID;
	const grantProjects = await mongoHandlerThrows(getGrantMatchesByGrant(grant._id));
	const matchedProjects = [] as Project[];
	if (grantProjects.length > 0) {
		for (let grantProject of grantProjects) {
			const project = await mongoHandlerThrows(getProject(grantProject.projectId));
			matchedProjects.push(project);
		}
	}

	return json({ grant, matchedProjects });
}

export default function GrantView() {
	const { grant, matchedProjects } = useLoaderData<typeof loader>();

	return grant ? (
		<div className="w-full h-screen">
			<div className="px-5 w-full h-full">
				<div className="mb-2 py-4 text-center">
					<h1 className="font-title mb-2 text-4xl font-extrabold">{grant.title}</h1>
				</div>
				<h1 className="font-title mb-2 text-2xl pb-2">{grant.description}</h1>
				<h1 className="font-title mb-2 text-2xl pb-2">Value: ${grant.value.toLocaleString()}</h1>
				<h1 className="font-title mb-2 text-xl pb-1">Tags</h1>
				<div className="flex flex-row flex-wrap gap-5 pb-10">
					{grant.tags.map((tag) => {
						return (
							<div className="badge badge-accent badge-lg flex flex-row gap-2">
								<p className='bold'>{tag} </p>
								<button>
									<span>&times;</span>
								</button>
							</div>
						);
					})}
				</div>
				<h1 className="font-title mb-2 text-3xl font-extrabold pb-1">Matched Projects</h1>
				<div className="flex flex-row flex-wrap gap-5 pb-10">
					{matchedProjects.map(project => {
						return project ? <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<a href="#">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project?.name}</h5>
						</a>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							{project?.description}<br /><br />
							Capital Expenditure: ${project?.capex.toLocaleString()}<br />
							Annual Opex: ${project?.annualOpex.toLocaleString()}<br />
							Start Date: {project?.startDate.slice(0, 10)}<br />
							End Date: {project?.endDate.slice(0, 10)}
						</p>
					</div> : <></>
					})}
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
