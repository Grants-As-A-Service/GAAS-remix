import { ErrorBoundaryComponent, json, LoaderArgs } from "@remix-run/node";
import { mongoHandler, multiHandler } from "../../utils/httpHandler";
import { getAccount } from "../../../db/controllers/accountController";
import { Link, useLoaderData } from "@remix-run/react";
import { getProjects } from "db/controllers/projectController";
import { useEffect } from "react";
import { ErrorComp } from "../../components/error";

export const loader = async ({ request }: LoaderArgs) => {
    let userEmail = request.headers.get("user") as string;

    let [[account, projects], status] = await multiHandler<[AccountInfo, Project]>([getAccount(userEmail), getProjects()]);

    return json({ account, projects: [projects] }, { status: status });
};

export const ErrorBoundary = ErrorComp;

export default function Dashboard() {
    const { account, projects } = useLoaderData<typeof loader>();

    return (
        <div className="grid place-items-left items-start flex-1 ml-20">
            <div className="hero-content col-start-1 row-start-1 w-full max-w-8xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
                <div className="lg:pl-1 lg:pb-24">
                    <div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
                        <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-4xl">Welcome {account.user.name}</h1>
                    </div>

                    <h1 className="font-title mb-2 text-2xl sm:text-2xl lg:text-2xl">Your Projects</h1>

                    <div className="mb-2 flex flex-row gap-10"></div>
                    <Link to="/home/create/project" className="btn btn-md btn-secondary">
                        Create a Project
                    </Link>
                </div>
            </div>
        </div>
    );
}
