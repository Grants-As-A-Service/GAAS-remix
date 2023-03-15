import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { ProjectBuilder } from "buisnessObjects/project";
import { createProject, getProjects } from "db/controllers/projectController";
import { getTagNames } from "db/controllers/tagNamesController";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Form, FormButton, FormInput, FormLabel } from "~/components/forms/Form";
import { useFormValidation } from "~/components/hooks/formValidation";
import { mongoHandlerThrows, multiHandlerThrows } from "~/utils/handler";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
	let user = request.headers.get("user");

	let [tags] = await multiHandlerThrows<[Array<string>]>([getTagNames()]);

	return json({ tags });
}

export default function ProjectOnbaord() {
	const { tags } = useLoaderData<typeof loader>();
	const [selectedTags, setSelectedTags] = useState<Map<string, Tag>>(new Map());
	const [descriptionWC, setDescriptionWC] = useState(0);
	const [initState] = useState({
		name: "",
		description: "",
		startDate: new Date(),
		endDate: new Date(),
		capex: 0,
		annualOpex: 0,
		status: "pending",
	});
	const [update, error, setError, submit] = useFormValidation<Project>(
		initState,
		(state: Project) => {
			for (const [key, value] of Object.entries(state)) {
				//@ts-ignore
				if (key !== "status" && initState[key] === value) {
					return "enter a value for " + key;
				}
			}
		},
		(state: Project) => {
			console.log(state);
			console.log(selectedTags);
		}
	);

	return (
		<div className="w-full h-screen">
			<div className="px-5 w-full h-full">
				<div className="mb-2 py-4 text-center">
					<h1 className="font-title mb-2 text-4xl font-extrabold">Create a project</h1>
				</div>
				<div className="flex flex-row gap-5 w-full">
					<Form customWidth="max-w-md">
						<h3 className="font-title mb-2 text-2xl font-extrabold">Project Details</h3>
						<FormInput type="text" label="Project Name" onTyping={(e) => update(e.target.value, "name")} />
						<FormLabel>Project Description</FormLabel>
						<textarea
							className="textarea textarea-primary"
							placeholder="This project is..."
							onChange={(e) => {
								if (e.target.value.length < 3000) {
									update(e.target.value, "description");
									setDescriptionWC(e.target.value.length);
								}
							}}
						></textarea>
						<p>{descriptionWC}/3000</p>

						<FormInput onTyping={(e) => update(e.target.value, "capex")} type="number" label="capex" />

						<FormInput onTyping={(e) => update(e.target.value, "annualOpex")} type="number" label="Annual Opex" />
						<div className="flex flex-row gap-3">
							<FormInput onTyping={(e) => update(e.target.value, "startDate")} type="date" label="Start Date" />
							<FormInput onTyping={(e) => update(e.target.value, "endDate")} type="date" label="End Date" />
						</div>
						<FormButton onClick={() => submit()}>Confirm</FormButton>
					</Form>

					<div className="flex flex-col w-full">
						<div className="d-flex w-75 flex-column mt-5">
							<h3 className="font-title mb-2 text-3xl font-extrabold">Impact Tags</h3>
							<p>Add impact tags to demonstrate how your project aligns with social objectives.</p>
							<div className="py-4">
								<div className="dropdown dropdown-hover">
									<label tabIndex={0} className="btn m-1">
										Add Impact Tag
									</label>
									<ul
										tabIndex={0}
										className="h-52 w-52 overflow-y-scroll dropdown-content menu p-2 shadow bg-base-300 rounded-box flex-nowrap"
									>
										{tags.map((tag) => (
											<li
												onClick={() => {
													setSelectedTags((oldTags) => {
														let newTags = structuredClone(oldTags);
														newTags.set(tag, {
															name: tag,
															description: "",
															quantifier: 0,
														});
														return newTags;
													});
												}}
											>
												<a>{tag}</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className="flex flex-row flex-wrap w-full gap-5">
							{Array.from(selectedTags).map(([tagName]) => {
								const updateTag = (key: keyof Tag, value: any) => {
									console.log(value);
									setSelectedTags((oldTags) => {
										let newTags = structuredClone(oldTags);
										let tag = newTags.get(tagName);
										//@ts-ignore
										tag[key] = value;
										return newTags;
									});
								};
								return (
									<Form customWidth="max-w-sm">
										<h3 className="font-title mb-2 text-lg">Tag: {tagName}</h3>
										<FormLabel>Strength</FormLabel>
										<input
											type="range"
											min="0"
											max="10"
											onChange={(e) => updateTag("quantifier", e.target.value)}
											className="range range-primary"
										/>
										<div className="pb-5" />
										<textarea
											className="textarea textarea-primary"
											placeholder="This project is..."
											onChange={(e) => updateTag("description", e.target.value)}
										/>
										<div className="pb-5" />
										<button
											className="btn btn-active btn-accent"
											onClick={() => {
												setSelectedTags((oldTags) => {
													let newTags = structuredClone(oldTags);
													newTags.delete(tagName);
													return newTags;
												});
											}}
										>
											Remove
										</button>
									</Form>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
