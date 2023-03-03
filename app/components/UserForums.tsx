import { useContext } from "react";
import { signup } from "~/utils/firebaseClient";
import { UserContext } from "../routes/register";
import { Forum, ForumInput, ForumButton } from "./forums/Forum";
import { useForumValidationPost, validEmail, validPassword } from "./hooks/forumValidation";

type UserLogin = { email: string; password: string; confirmPassword: string; number: string; name: string };

export const UserCredentialForm = () => {
    const { setUser } = useContext(UserContext);

    const [update, submit, isFetching, error, setError] = useForumValidationPost<UserLogin>(
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
        (state: UserLogin) => {
            return new Promise((resolve, reject) => {
                signup(state.email, state.password)
                    .then((res) => {
                        setUser({
                            name: state.name,
                            email: state.email,
                            phone: state.number,
                        });
                        resolve(res);
                    })
                    .catch((error) => {
                        if (error.customData._tokenResponse.error.message === "EMAIL_EXISTS") {
                            
                            window.location.href = "/login";
                        }
                        reject(error);
                    });
            });
        }
    );

    return (
        <Forum>
            <h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
            <ForumInput name="name" onTyping={(e) => update(e.target.value, "name")} type="text" label="Name" />
            <ForumInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
            <ForumInput name="number" onTyping={(e) => update(e.target.value, "number")} type="number" label="Phone Number" />
            <ForumInput name="password" onTyping={(e) => update(e.target.value, "password")} type="text" label="Password" />
            <ForumInput onTyping={(e) => update(e.target.value, "confirmPassword")} type="text" label="Confirm Password" />
            <h2 className="py-2 text-red-600">{error}</h2>
            <ForumButton onClick={(e) => submit()}>Sign Up</ForumButton>
        </Forum>
    );
};
