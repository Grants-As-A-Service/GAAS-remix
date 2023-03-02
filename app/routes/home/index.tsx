import { json, LoaderArgs } from "@remix-run/node";
import { mongoHandler, multiHandler } from "../../utils/httpHandler";
import { getAccount } from "../../../db/controllers/accountController";
import { Link, useLoaderData } from "@remix-run/react";
import { getProjects } from "db/controllers/projectController";

export const loader = async ({ request }: LoaderArgs) => {
    let userEmail = request.headers.get("user") as string;

    let [[account, projects], status] = await multiHandler<[AccountInfo, Project], AccountInfo | Project>([getAccount(userEmail), getProjects()]);

    return json({ account, projects }, { status: status });
};

export default function Dashboard() {
    const { account, projects } = useLoaderData<typeof loader>();

    return (
        <div className="grid place-items-left items-start flex-1 ml-20">
            <div className="hero-content col-start-1 row-start-1 w-full max-w-8xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
                <div className="lg:pl-1 lg:pb-24">
                    <div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
                        <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-4xl">Welcome {account.user.name}</h1>
                    </div>
                    <div className="flex flex-row gap-10"></div>

                    <div>
                        <div>
                            {projects.map((project, i) => {
                                return (
                                    <div>
                                        {/* <div key={i} className="mt-4">
                                            <div>
                                                <CardTitle tag="h5">{project.name}</CardTitle>
                                            </div>
                                            <CardBody>
                                                <CardText>{project.description}</CardText>
                                            </CardBody>
                                            <CardFooter>
                                                <Button color="primary" onClick={() => swapScreen("ProjectView", { project })}>
                                                    View
                                                </Button>
                                            </CardFooter>
                                        </div> */}
                                    </div>
                                );
                            })}
                            {/* <Col xs={12} md={6} lg={3} className="pt-4">
                                <Button color="success" outline onClick={() => swapScreen("ProjectOnboard")}>
                                    + Add Project
                                </Button>
                            </Col> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
