import { ForumButton, ForumInput, Forum } from "../../../components/Forum";
import { useForumValidation, validEmail, validPassword } from "components/forumValidation";
import { login, signup } from "utils/firebaseClient";
import { useAuthState } from "components/useAuthState";

type UserLogin = { email: string; password: string };

export default function Login() {
    useAuthState();

    const [update, submit, error, setError] = useForumValidation<UserLogin>(
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
        (state: UserLogin) => {
            return login(state.email, state.password);
        }
    );

    return (
        <Forum>
            <h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
            <ForumInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
            <ForumInput name="password" onTyping={(e) => update(e.target.value, "password")} type="text" label="Password" />
            <h2 className="py-2 text-red-600">{error}</h2>
            <ForumButton
                onClick={(e) => {
                    submit()
                        .then((res) => {
                            window.location.href = "/home";
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
            >
                Sign Up
            </ForumButton>
        </Forum>
    );
}
