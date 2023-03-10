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
import { BuisnessBuilder } from "buisnessObjects/buisness";
import { createBuisness } from "db/controllers/buisnessController";

export async function action({ request }: { request: Request }) {
	let body = await request.json();

	let buisness = bodyParserHandler(new BuisnessBuilder(body));

	let [res, status] = await mongoHandler(createBuisness(buisness));

	return new Response(JSON.stringify(res), {
		status: status,
	});
}

export default function Buisness() {
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
		},
		(state: Business) => {
			return fetch("/register/buisness", {
				method: "post",
				body: JSON.stringify(state),
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
		<>
			<Form>
				<h1 className="text-primary font-title text-2xl m-0 p-0">Buisness Info</h1>
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
			</Form>
			<Form>
				<h1 className="text-primary font-title text-2xl m-0 p-0">Industry</h1>
				<FormDropDown label="Industry" setOption={(option: string) => update(option, "industry")} options={forumData.industries} />
				<div>
					<FormInput onTyping={(e) => update(e.target.value, "fte")} type="number" label="Full Time Employees" />
					<FormInput onTyping={(e) => update(e.target.value, "pte")} type="number" label="Part Time Employees" />
				</div>
				<FormInput onTyping={(e) => update(e.target.value, "yearOfInception")} type="date" label="Year of Inception" />
				<FormInput onTyping={(e) => update(e.target.value, "annualRevenue")} type="number" label="Annual Revenue ($)" />

				<h2 className="py-2 text-red-600">{error}</h2>

				<FormButton onClick={(e) => upload()}>Sign Up</FormButton>
			</Form>
		</>
	);
}
