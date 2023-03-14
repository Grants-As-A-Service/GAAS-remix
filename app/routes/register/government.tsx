import { useContext, useEffect, useState } from "react";
import { UserContextADT } from "../register";
import { Form, FormInput, FormDropDown, FormButton } from "../../components/forms/Form";
import { useFormValidation, useFormValidationPost } from "../../components/hooks/formValidation";
import forumData from "../../../FormData.json";
import { authorize } from "~/utils/firebaseClient";
import { useOutletContext } from "@remix-run/react";
import { Request, json, ActionArgs } from "@remix-run/node";
import { bodyParserHandler, mongoHandler, mongoHandlerThrows } from "~/utils/httpHandler";
import { GovernmentBuilder } from "buisnessObjects/government";
import { createGovernment } from "db/controllers/governmentController";
import { AccountBuilder } from "buisnessObjects/account";
import { getAccountId } from "db/controllers/accountController";

export async function action({ request }: ActionArgs) {
	let body = await request.json();

	let government = bodyParserHandler(new GovernmentBuilder(body.government));
	let account = bodyParserHandler(new AccountBuilder(body.user));

	let accountID = await mongoHandlerThrows(getAccountId(account.email));

	let res = await mongoHandlerThrows(createGovernment(government, accountID as string));

	return new Response(JSON.stringify({ res }));
}

type GovernmentButName = {
	level: "";
	govDetails: "";
	annualFundingBudget: 0;
	fundedProjects: 0;
};

export default function Government() {
	const { user } = useOutletContext<UserContextADT>();

	const [initState] = useState<GovernmentButName>({
		level: "",
		govDetails: "",
		annualFundingBudget: 0,
		fundedProjects: 0,
	});

	const [update, submit, error, setError] = useFormValidationPost<GovernmentButName>(
		initState,
		(state: GovernmentButName) => {
			for (const [key, value] of Object.entries(state)) {
				//@ts-ignore
				if (key !== "name" && initState[key] === value) {
					return "enter a value for " + key;
				}
			}
		},
		(state: GovernmentButName) => {
			return fetch("/register/government", {
				method: "post",
				body: JSON.stringify({
					government: {
						...state,
						name: user?.name,
					},
					user,
				}),
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
			<h2 className="py-2 text-red-600">{error}</h2>
			<FormButton onClick={(e) => upload()}>Sign Up</FormButton>
		</Form>
	);
}
