import { useContext } from "react";
import { signup } from "~/utils/firebaseClient";
import { UserContext } from "../../routes/register";
import { Form, FormInput, FormButton } from "./Form";
import { useFormValidation, useFormValidationPost, validEmail, validPassword } from "../hooks/formValidation";

type UserLogin = { email: string; password: string; confirmPassword: string; number: string; name: string };

export const UserCredentialForm = () => {
    const { setUser } = useContext(UserContext);

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
            return "";
        },
        async (state: UserLogin) => {
            try {
                await signup(state.email, state.password);
                setUser({
                    name: state.name,
                    email: state.email,
                    phone: state.number,
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
            <FormInput name="password" onTyping={(e) => update(e.target.value, "password")} type="text" label="Password" />
            <FormInput onTyping={(e) => update(e.target.value, "confirmPassword")} type="text" label="Confirm Password" />
            <h2 className="py-2 text-red-600">{error}</h2>
            <FormButton onClick={(e) => submit()}>Sign Up</FormButton>
        </Form>
    );
};
