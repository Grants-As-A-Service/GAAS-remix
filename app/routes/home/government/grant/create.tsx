import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { getTagNames } from "db/controllers/tagNamesController";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { Form, FormButton, FormInput, FormLabel } from "~/components/forms/Form";
import { useFormValidationPost } from "~/components/hooks/formValidation";
import { bodyParserHandler, mongoHandlerThrows, multiHandlerThrows } from "~/utils/handler";
import { GrantBuilder } from "buisnessObjects/grant";
import { createGrant } from "db/controllers/grantController";
import router from "~/utils/router";
import { MatchProjectsToGrant } from "~/utils/grantMatcher";
import { createGrantProject } from "db/controllers/grantProjectController";

export async function loader({ request }: LoaderArgs) {
	let tags = await mongoHandlerThrows<Array<any>>(getTagNames());

	return json({ tags });
}

export async function action({ request }: ActionArgs) {
	let { accountId } = JSON.parse(request.headers.get("user") as string);
	let body = await request.json();

	console.log({ ...body, creator: accountId });

	let grant = bodyParserHandler(new GrantBuilder({ ...body, creator: accountId } as Grant));

	let grantDoc = await mongoHandlerThrows(createGrant(grant)) as any;

	const projectMatches = await MatchProjectsToGrant(grantDoc._id.toString());
	await multiHandlerThrows(projectMatches.map(projectId => createGrantProject(grantDoc._id.toString(), projectId)));

	return new Response();
}

type GrantInfo = { title: string; description: string; value: number };

export default function CreateGrant() {
	const { tags } = useLoaderData<typeof loader>();
	const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

	const [initState] = useState<GrantInfo>({
		title: "",
		description: "",
		value: 0
	});
	const [update, submit, error, setError] = useFormValidationPost<GrantADT>(
		{...initState, tags: [], createdAt: new Date(), creator: ""},
		(state: GrantADT) => {
			for (const [key, value] of Object.entries(state)) {
				//@ts-ignore
				if (initState[key] === value) {
					return "enter a value for " + key;
				}
			}
		},
		(state: GrantInfo) => {
			return fetch("/home/government/grant/create", {
				method: "post",
				body: JSON.stringify({
					...state,
					createdAt: new Date().toJSON().slice(0, 10),
					tags: Array.from(selectedTags),
				}),
			});
		}
	);

	return (
		<div className="w-full h-screen">
			<div className="px-5 w-full h-full">
				<div className="mb-2 py-4 text-center">
					<h1 className="font-title mb-2 text-4xl font-extrabold">Create a Grant</h1>
				</div>
				<div className="flex flex-row gap-5 w-full justify-center">
					<Form customWidth="max-w-lg">
						<FormInput onTyping={(e) => update(e.target.value, "title")} type="text" label="Title" />
						<FormInput onTyping={(e) => update(e.target.value, "description")} type="text" label="Description" />
						<FormInput onTyping={(e) => update(e.target.value, "value")} type="number" label="Value" />
						<FormLabel>Tags</FormLabel>
						<div className="flex flex-row w-full flex-wrap gap-4">
							{Array.from(selectedTags).map((tag) => {
								return (
									<div className="badge badge-secondary badge-lg flex flex-row gap-2">
										<div>{tag} </div>
										<button
											onClick={() =>
												setSelectedTags((oldtags) => {
													let newTags = structuredClone(oldtags);
													newTags.delete(tag);
													return newTags;
												})
											}
										>
											<span>&times;</span>
										</button>
									</div>
								);
							})}
						</div>
						<div className="dropdown dropdown-hover pt-2">
							<label tabIndex={0} className="btn m-1">
								Add Tag
							</label>
							<ul tabIndex={0} className="h-52 w-52 overflow-y-scroll dropdown-content menu p-2 shadow bg-base-300 rounded-box flex-nowrap">
								{tags.map((tagDoc) => {
									return (
										<li
											onClick={() =>
												setSelectedTags((oldTags) => {
													let newTags = structuredClone(oldTags);
													newTags.add(tagDoc.name);
													return newTags;
												})
											}
										>
											<a>{tagDoc.name}</a>
										</li>
									);
								})}
							</ul>
						</div>
						<h2 className="py-2 text-red-600">{error}</h2>
						<FormButton onClick={() => submit().then(() => router.navigate("/home/government"))}>Create</FormButton>
					</Form>
				</div>
			</div>
		</div>
	);
}
