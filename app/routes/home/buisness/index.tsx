import { ErrorBoundaryComponent, json, LoaderArgs } from "@remix-run/node";
import { mongoHandler, multiHandler } from "../../../utils/handler";
import { getAccount } from "../../../../db/controllers/accountController";
import { Link, ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
import { getProjects } from "db/controllers/projectController";
import { useEffect } from "react";
import { ErrorComp } from "../../../components/error";
import router from "~/utils/router";
import { Card } from "~/components/card";

export const loader = async ({ request }: LoaderArgs) => {
	let { email, userType, accountId } = JSON.parse(request.headers.get("user") as string);

	let [[account, projects], status] = await multiHandler<[Account, Array<Project>]>([getAccount(email), getProjects(accountId)]);

	return json({ account, projects, userType }, { status: status });
};

export const ErrorBoundary = ErrorComp;

export default function Dashboard() {
	const { account, userType, projects } = useLoaderData<typeof loader>();
	return (
		<div className="grid place-items-left items-start flex-1 ml-20">
			<div className="hero-content col-start-1 row-start-1 w-full max-w-8xl justify-between pb-40 flex-row items-end gap-0">
				<div className="pl-1">
					<div className="mb-2 py-4 text-left">
						<h1 className="font-title mb-2 text-4xl font-extrabold">Welcome {account.name}</h1>
						<h1 className="font-title mb-2 text-2xl">{userType}</h1>
					</div>

					<h1 className="font-title mb-2 text-2xl py-2">Your Projects</h1>
					<div className="w-full flex flex-row flex-wrap py-2 gap-10">
						{projects.map((project) => {
							return (
								<div
									className="card w-64 bg-primary text-primary-content hover:bg-primary-focus"
									onClick={() => router.navigateWithProps("/home/buisness/project/view", project)}
								>
									<div className="card-body">
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-col">
												<h2 className="card-title">{project.name}</h2>
												<p className="text-primary-content">{project.status}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="mb-2 flex flex-row gap-10"></div>
					<Link to="/home/buisness/project/create" className="btn btn-md btn-secondary">
						Create a Project
					</Link>
				</div>
			</div>
		</div>
	);
}
