import { FormButton, FormInput, Form } from "./Form";
import { useFormValidationPost, validEmail, validPassword } from "../hooks/formValidation";
import { authorize, login, signup } from "~/utils/firebaseClient";

type UserLogin = { email: string; password: string };

export default function Login({ done }: { done: () => void }) {
    const [update, submit, error, setError] = useFormValidationPost<UserLogin>(
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
            return "";
        },
        async (state: UserLogin) => {
            await login(state.email, state.password);
            return authorize();
        }
    );

    return (
        <div className="w-full h-full base-100">
            <div className="w-full flex flex-col justify-center content-center">
                <div className="w-full flex flex-row gap-20 p-10 justify-center">
                    <Form>
                        <h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
                        <FormInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
                        <FormInput name="password" onTyping={(e) => update(e.target.value, "password")} type="text" label="Password" />
                        <h2 className="py-2 text-red-600">{error}</h2>
                        <FormButton
                            onClick={(e) => {
                                submit().then(() => done());
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
