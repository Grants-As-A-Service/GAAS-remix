import { useContext, useEffect, useState } from "react";
import { UserContextADT } from "../register";
import { Form, FormInput, FormDropDown, FormButton } from "../../components/forms/Form";
import { useFormValidation, useFormValidationPost } from "../../components/hooks/formValidation";
import forumData from "../../../FormData.json";
import { authorize } from "~/utils/firebaseClient";
import { useOutletContext } from "@remix-run/react";
import { Request, json } from "@remix-run/node";
import { bodyParserHandler, mongoHandler } from "~/utils/httpHandler";
import { GovernmentBuilder } from "buisnessObjects/government";
import { createGovernment } from "db/controllers/governmentController";

export async function action({ request }: { request: Request }) {
	let body = await request.json();

	let government = bodyParserHandler(new GovernmentBuilder(body));

	let [res, status] = await mongoHandler(createGovernment(government));

	return new Response(JSON.stringify(res), {
		status: status,
	});
}

export default function Government() {
	const { user, type } = useOutletContext<UserContextADT>();

	const [initState] = useState<Government>({
		name: "",
		level: "",
		govDetails: "",
		annualFundingBudget: 0,
		fundedProjects: 0,
	});

	const [update, submit, error, setError] = useFormValidationPost<Government>(
		initState,
		(state: Government) => {
			for (const [key, value] of Object.entries(state)) {
				//@ts-ignore
				if (initState[key] === value) {
					return "enter a value for " + key;
				}
			}
		},
		(state: Government) => {
			return fetch("/register/buisness", {
				method: "post",
				body: JSON.stringify({ ...state, name: user?.name }),
			});
		}
	);

	const upload = () => {
		submit().then(() => {
			authorize().then(() => {
				window.location.href = "/home";
			});
		});
	};

	return (
		<Form>
			<h1 className="text-primary font-title text-2xl m-0 p-0">Governmet Form</h1>
			<FormInput onTyping={(e) => update(e.target.value, "level")} type="text" label="level" />
			<FormInput onTyping={(e) => update(e.target.value, "govDetails")} type="text" label="Details" />
			<div>
				<FormInput onTyping={(e) => update(e.target.value, "annualFundingBudget")} type="number" label="Annual Funding Budget" />
				<FormInput onTyping={(e) => update(e.target.value, "fundedProjects")} type="number" label="Funded Projects" />
			</div>
			<FormButton onClick={(e) => upload()}>Sign Up</FormButton>
		</Form>
	);
}
