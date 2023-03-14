import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { ProjectBuilder } from "buisnessObjects/project";
import { createProject, getProjects } from "db/controllers/projectController";
import { getTagNames } from "db/controllers/tagNamesController";
import { useState } from "react";
import { Link, ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
import { bodyParserHandler, mongoHandler, multiHandler } from "~/utils/httpHandler";
import { Form, FormInput, FormLabel } from "~/components/forms/Form";
import { useFormValidation } from "~/components/hooks/formValidation";

// export async function action({ request }: ActionArgs) {
//     let email = request.headers.get("user");

//     let body = bodyParserHandler(new ProjectBuilder(await request.json()));

//     let [res, status] = await mongoHandler(createProject(body));

//     return new Response(null, {
//         status: 200,
//     });
// }

export async function loader({ request }: LoaderArgs) {
	let user = request.headers.get("user");

	getTagNames();

	return new Response(null, {
		status: 200,
	});
}

export default function ProjectOnbaord() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useFormValidation<Project>({ 
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        capex: 0,
        annualOpex: 0,
        tags: [],
        status: "";
    })


    const [projectFeilds, setProjectFeilds] = useState<ProjectADT>({
        tags: new Array<Tag>(),
    } as Project);

	const [descriptionWC, setDescriptionWC] = useState(0);

	const submit = async () => {
		// onBoardProject(projectFeilds).then(() => {
		//     swapScreen("Home");
		// });
	};

	return (
		<div className="grid place-items-center items-start bg-gradient-to-br flex-1">
			<div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-40 lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
				<div className="lg:pl-10 lg:pb-24">
					<div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
						<h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-5xl">Create a project</h1>
					</div>
					<div className="flex flex-row gap-10">
						<>
							<Form>
								<FormLabel>Project Name</FormLabel>
								<FormInput
									type="text"
									name="name"
									label="New Project"
									onTyping={(e) => toggleProjectFeild(e.target.value, "name")}
								/>
							</Form>
							<FormGroup>
								<Label for="description">Project Description</Label>
								<textarea
									className="form-control"
									id="description"
									placeholder="This project is..."
									value={projectFeilds.description}
									onChange={(e) => {
										toggleProjectFeild(e.target.value.length > 3000 ? projectFeilds.description : e.target.value, "description");
										setDescriptionWC(e.target.value.length);
									}}
								></textarea>
								<p>{descriptionWC}/3000</p>
							</FormGroup>
							<FormGroup>
								<Label for="capex">Capital Investment Required</Label>
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text">$</span>
									</div>
									<input
										type="text"
										id="capex"
										className="form-control"
										placeholder="Capital Investment Required"
										value={projectFeilds.capex}
										onChange={(e) => toggleProjectFeild(e.target.value, "capex")}
									/>
								</div>
							</FormGroup>
							<FormGroup>
								<Label for="annualOpex">Annual Operating Expenses</Label>
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text">$</span>
									</div>
									<input
										type="text"
										id="annualOpex"
										className="form-control"
										placeholder="Annual Operating Expenses"
										value={projectFeilds.annualOpex}
										onChange={(e) => toggleProjectFeild(e.target.value, "annualOpex")}
									/>
								</div>
							</FormGroup>
							<FormGroup>
								<Row>
									<Col xs={12} md={6}>
										<Label for="startDate">Start Date</Label>
										<Input type="date" id="startDate" onChange={(e) => toggleProjectFeild(e.target.value, "startDate")} />
									</Col>
									<Col xs={12} md={6}>
										<Label for="endDate">Start Date</Label>
										<Input type="date" id="endDate" onChange={(e) => toggleProjectFeild(e.target.value, "endDate")} />
									</Col>
								</Row>
							</FormGroup>
						</Form>
					</div>
				</div>
			</div>
		</div>

		//     <Container>
		//         <Row className="justify-content-center">
		//             <div className="d-flex w-75 flex-column mt-5">
		//                 <h3>Add New Project</h3>
		//
		//                 <hr></hr>
		//                 <h3 className="mt-2">Impact Tags</h3>
		//                 <p>Add impact tags to demonstrate how your project aligns with social objectives.</p>
		//                 <Dropdown
		//                     isOpen={open}
		//                     toggle={() => {
		//                         setOpen(!open);
		//                     }}
		//                 >
		//                     <DropdownToggle color="success" outline caret>
		//                         Add Impact Tag
		//                     </DropdownToggle>
		//                     <DropdownMenu left>
		//                         {tags.map((tag) => (
		//                             <DropdownItem
		//                                 onClick={() => {
		//                                     updateTags(tag);
		//                                 }}
		//                             >
		//                                 {tag}
		//                             </DropdownItem>
		//                         ))}
		//                     </DropdownMenu>
		//                 </Dropdown>
		//                 <Row className="p-5">
		//                     {selectedTags.map((tag) => (
		//                         <Col xs={12} lg={4} md={6}>
		//                             <ProjectTag label={tag} update={toggleProjectFeild} />
		//                         </Col>
		//                     ))}
		//                 </Row>
		//                 <Button style={{ width: "150px" }} color="success" onClick={() => submit()}>
		//                     Save Project
		//                 </Button>
		//             </div>
		//         </Row>
		//     </Container>
	);
}
