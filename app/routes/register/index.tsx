import { createContext, useEffect, useState } from "react";
import { BuisnessCredentialsForum } from "./BuissnessForum";
import { UserCredentialForm } from "./UserForums";
import { Request, json } from "@remix-run/node";
import { createAccount } from "db/controllers/accountController";
import { mongoHandlerAlwaysResolve } from "utils/httpHandler";
import { AccountBuilder } from "buisnesObjects/account";

export async function action({ request }: { request: Request }) {
    let body = await request.json();

    let account = new AccountBuilder(body).build();

    let res = await mongoHandlerAlwaysResolve(createAccount(account));

    return new Response(JSON.stringify(res.data), {
        status: res.status,
    });
}

type UserContextADT = {
    buisness: BusinessADT | undefined;
    setBuisness: React.Dispatch<React.SetStateAction<BusinessADT | undefined>>;
    user: UserADT | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserADT | undefined>>;
};

export const UserContext = createContext<UserContextADT>({} as UserContextADT);

export default function Register() {
    const [buisness, setBuisness] = useState<BusinessADT | undefined>();
    const [user, setUser] = useState<UserADT | undefined>();

    return (
        <div className="w-full h-full base-100">
            <div className="w-full flex flex-col justify-center content-center">
                <div className="w-full flex flex-row gap-20 p-10 justify-center">
                    <UserContext.Provider value={{ buisness, setBuisness, user, setUser }}>
                        {typeof user === "undefined" ? <UserCredentialForm /> : <BuisnessCredentialsForum />}
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    );
}
