import { useContext, useEffect, useState } from "react";
import { UserContextADT } from "../register";
import { Form, FormInput, FormDropDown, FormButton } from "../../components/forms/Form";
import { useFormValidation, useFormValidationPost } from "../../components/hooks/formValidation";
import forumData from "../../../FormData.json";
import { authorize } from "~/utils/firebaseClient";
import { useOutletContext } from "@remix-run/react";
import { Request, json } from "@remix-run/node";
import { createAccount } from "db/controllers/accountController";
import { bodyParserHandler, mongoHandler } from "~/utils/httpHandler";
import { AccountBuilder, AccountError } from "buisnesObjects/account";

//register post
export async function action({ request }: { request: Request }) {
	let body = await request.json();
	console.log(body);
	let account = bodyParserHandler(new AccountBuilder(body));

	let [res, status] = await mongoHandler(createAccount(account));

	console.log(status);
	return new Response(JSON.stringify(res), {
		status: status,
	});
}

export default function Government() {
	const { user, type } = useOutletContext<UserContextADT>();

	const [initState] = useState<Business>({
		name: "",
		phone: "",
		address: "",
		city: "",
		province: "",
		postalCode: "",
		industry: "",
		fte: 0,
		pte: 0,
		annualRevenue: 0,
		yearOfInception: new Date(),
		projects: [],
	});

	const [update, submit, error, setError] = useFormValidationPost<BusinessADT>(
		initState,
		(state: BusinessADT) => {
			if (state.phone.length !== 10) {
				return "bad phone number";
			}

			for (const [key, value] of Object.entries(state)) {
				//@ts-ignore
				if (initState[key] === value) {
					return "enter a value for " + key;
				}
			}

			return "";
		},
		(state: BusinessADT) => {
			let account: AccountInfo = {
				buisness: state,
				user: user as User,
			};

			return fetch("/register/buisness", {
				method: "post",
				body: JSON.stringify(account),
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
			<FormInput onTyping={(e) => update(e.target.value, "name")} type="text" label="Buisness Name" />
			<FormInput onTyping={(e) => update(e.target.value, "phone")} type="tel" label="Buisness Phone" />

			<div>
				<FormInput onTyping={(e) => update(e.target.value, "address")} type="address" label="Address" />
				<FormInput onTyping={(e) => update(e.target.value, "city")} type="text" label="City" />
			</div>
			<div>
				<FormDropDown
					label="Province"
					setOption={(option: string) => update(option, "province")}
					options={forumData.provinces.map((province) => province.name)}
				/>
				<FormInput onTyping={(e) => update(e.target.value, "postalCode")} type="text" label="Postal Code" />
			</div>

			<FormButton onClick={(e) => upload()}>Sign Up</FormButton>
		</Form>
	);
}
