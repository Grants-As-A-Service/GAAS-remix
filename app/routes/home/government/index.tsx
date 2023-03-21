import { ErrorBoundaryComponent, json, LoaderArgs } from "@remix-run/node";
import { mongoHandler, mongoHandlerThrows, multiHandlerThrows } from "../../../utils/handler";
import { getAccountFromId } from "../../../../db/controllers/accountController";
import { Link, ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
import { getProjects } from "db/controllers/projectController";
import { useEffect } from "react";
import { ErrorComp } from "../../../components/error";
import router from "~/utils/router";
import { getCreatedGrants } from "db/controllers/grantController";
import { Card } from "~/components/card";

export const loader = async ({ request }: LoaderArgs) => {
	let { userType, accountId } = JSON.parse(request.headers.get("user") as string);

	let [account, grantsDb] = await multiHandlerThrows<[Account, Array<Grant>]>([getAccountFromId(accountId), getCreatedGrants(accountId)]);

	return json({ userType, account, grants: grantsDb });
};

export const ErrorBoundary = ErrorComp;

export default function Dashboard() {
	const { userType, account, grants } = useLoaderData<typeof loader>();

	return (
		<div className="grid place-items-left items-start flex-1 ml-20">
			<div className="hero-content col-start-1 row-start-1 w-full max-w-8xl justify-between pb-40 flex-row items-end gap-0">
				<div className="pl-1">
					<div className="mb-2 py-4 text-left">
						<h1 className="font-title mb-2 text-4xl font-extrabold">Welcome {account.name}</h1>
						<h1 className="font-title mb-2 text-2xl">{userType}</h1>
					</div>

					<h1 className="font-title mb-2 text-2xl">Created Grants</h1>

					<div className="w-full flex flex-row flex-wrap py-2 gap-10">
						{grants.map((grant) => {
							return <Card route={"/home/government/grant/view"} title={grant.title} info={grant.description} data={grant} />;
						})}
					</div>
					<div className="pt-4">
						<Link to="/home/government/grant/create" className="btn btn-md btn-secondary">
							Create a grant
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
