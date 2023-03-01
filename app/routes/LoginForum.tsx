import { ForumButton, ForumInput, Forum } from "../../components/forums/Forum";
import { useForumValidationPost, validEmail, validPassword } from "~/hooks/forumValidation";
import { login, signup } from "utils/firebaseClient";

type UserLogin = { email: string; password: string };

export default function Login({ done }: { done: () => void }) {
    const [update, submit, isFecthing, error, setError] = useForumValidationPost<UserLogin>(
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
        <div className="w-full h-full base-100">
            <div className="w-full flex flex-col justify-center content-center">
                <div className="w-full flex flex-row gap-20 p-10 justify-center">
                    <Forum>
                        <h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
                        <ForumInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
                        <ForumInput name="password" onTyping={(e) => update(e.target.value, "password")} type="text" label="Password" />
                        <h2 className="py-2 text-red-600">{error}</h2>
                        <ForumButton
                            onClick={(e) => {
                                submit()
                                    .then((res) => {
                                        done();
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            Log In
                        </ForumButton>
                    </Forum>
                </div>
            </div>
        </div>
    );
}
