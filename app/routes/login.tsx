import { FormButton, FormInput, Form } from "../components/forms/Form";
import { useFormValidation, validEmail, validPassword } from "../components/hooks/formValidation";
import { authorize, login, signup } from "~/utils/firebaseClient";
import router from "~/utils/router";

type UserLogin = { email: string; password: string };

export default function Login() {
	const [update, error, setError, submit] = useFormValidation<UserLogin>(
		{
			email: "",
			password: "",
		},
		(state: UserLogin) => {
			if (!validEmail(state.email)) {
				return "bad email";
			}

			if (!validPassword(state.password)) {
				return "bad password";
            }
		},
		async (state: UserLogin) => {
			try {
				await login(state.email, state.password);
				await authorize();
				router.navigate("/home");
			} catch (error) {
				setError(JSON.stringify(error));
			}
		}
	);

	return (
		<div className="w-full h-full base-100">
			<div className="w-full flex flex-col justify-center content-center">
				<div className="w-full flex flex-row gap-20 p-10 justify-center">
					<Form>
						<h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
						<FormInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
						<FormInput name="password" onTyping={(e) => update(e.target.value, "password")} type="password" label="Password" />
						<h2 className="py-2 text-red-600">{error}</h2>
						<FormButton
							onClick={(e) => {
								submit();
							}}
						>
							Log In
						</FormButton>
					</Form>
				</div>
			</div>
		</div>
	);
}
