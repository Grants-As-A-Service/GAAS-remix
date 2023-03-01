import { Forum, ForumButton, ForumInput } from "../../../components/Forum";
import { useEffect, useRef, useState } from "react";
import { useForumValidation, validEmail, validPassword } from "../../../components/forumValidation";
import type { Request } from "@remix-run/node";
import { auth, signup } from "utils/firebaseClient";
import { useAuthState } from "components/useAuthState";

type UserLogin = { email: string; password: string; confirmPassword: string };

const UserCredentialForm = () => {
    const forum = useRef(null);
    const [update, submit, error, setError] = useForumValidation<UserLogin>(
        {
            email: "",
            password: "",
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
            return "";
        },
        (state: UserLogin) => {
            return signup(state.email, state.password);
        }
    );

    return (
        <Forum>
            <h1 className="text-primary font-title text-2xl m-0 p-0">Personal</h1>
            <ForumInput name="email" onTyping={(e) => update(e.target.value, "email")} type="text" label="Email" />
            <ForumInput name="password" onTyping={(e) => update(e.target.value, "password")} type="text" label="Password" />
            <ForumInput onTyping={(e) => update(e.target.value, "confirmPassword")} type="text" label="Confirm Password" />
            <h2 className="py-2 text-red-600">{error}</h2>
            <ForumButton
                onClick={(e) => {
                    submit()
                        .then(() => {
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
};

export default function Register() {
    useAuthState();

    const [registerFeild, setRegisterFeild] = useState<AccountInfoADT>({
        user: {} as UserADT,
        business: {} as BusinessADT,
    });

    const setUserData = (data: string, key: keyof UserADT) => {
        setRegisterFeild((oldRegisterField) => {
            oldRegisterField["user"][key] = data;
            return oldRegisterField;
        });
    };

    const setBusinessData = (data: any, key: keyof AccountInfoADT["business"]) => {
        setRegisterFeild((oldRegisterField) => {
            oldRegisterField["business"][key] = data;
            return oldRegisterField;
        });
    };

    // const [poster, isFetching] = useNextLoading(async () => {
    //     // await login(registerFeild.user.email, registerFeild.user.);
    //     re
    // });

    return (
        <div className="w-full h-full base-100">
            <div className="w-full flex flex-col justify-center content-center">
                <div className="w-full flex flex-row gap-20 p-10 justify-center">
                    <UserCredentialForm />
                </div>
            </div>
        </div>
    );
}
