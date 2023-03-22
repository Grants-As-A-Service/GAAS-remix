import { useOutletContext } from "@remix-run/react";
import { signup } from "~/utils/firebaseClient";
import { UserContextADT } from "../register";
import { Form, FormInput, FormButton } from "../../components/forms/Form";
import { useFormValidation, validEmail, validPassword } from "../../components/hooks/formValidation";
import { bodyParserHandler, mongoHandlerThrows, responseHandler } from "~/utils/handler";
import { AccountBuilder } from "buisnessObjects/account";
import { createAccount } from "db/controllers/accountController";

//register post
export async function action({ request }: { request: Request }) {
	let body = await request.json();

	let account = bodyParserHandler(new AccountBuilder(body));

	let res = (await mongoHandlerThrows(createAccount(account))) as any;

	return new Response(JSON.stringify(res));
}

type UserLogin = { email: string; password: string; confirmPassword: string; number: string; name: string };

export default function User() {
	const { setUser } = useOutletContext<UserContextADT>();

	const [update, error, setError, submit] = useFormValidation<UserLogin>(
		{
			name: "",
			email: "",
			password: "",
			number: "",
			confirmPassword: "",
		},
		(state: UserLogin) => {
			if (state.password !== state.confirmPassword) {
				return "passwords do not match";
			}
			if (!validEmail(state.email)) {
				return "bad email";
			}
			if (!validPassword(state.password)) {
				return "bad password";
			}
			if (state.number.length !== 10) {
				return "bad number";
			}
		},
		async (state: UserLogin) => {
			try {
				await signup(state.email, state.password);
				await responseHandler(
					fetch("/register/user", {
						method: "post",
						body: JSON.stringify({
							name: state.name,
							email: state.email,
							phone: state.number,
						}),
					})
				);

				setUser({
					email: state.email,
					phone: state.number,
					name: state.name,
				});
			} catch (error) {
				setError(JSON.stringify(error));
			}
		}
	);

	return (
		<Form>
			<h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
			<FormInput name="name" onTyping={(e) => update(e.target.value, "name")} type="text" label="Name" />
			<FormInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
			<FormInput name="number" onTyping={(e) => update(e.target.value, "number")} type="number" label="Phone Number" />
			<FormInput name="password" onTyping={(e) => update(e.target.value, "password")} type="password" label="Password" />
			<FormInput onTyping={(e) => update(e.target.value, "confirmPassword")} type="password" label="Confirm Password" />
			<h2 className="py-2 text-red-600">{error}</h2>
			<FormButton onClick={(e) => submit()}>Sign Up</FormButton>
		</Form>
	);
}
