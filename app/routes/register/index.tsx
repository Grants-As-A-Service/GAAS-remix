import { createContext, useEffect, useState } from "react";
import { BuisnessCredentialsForum } from "./BuissnessForum";
import { UserCredentialForm } from "./UserForums";
import { Request, json } from "@remix-run/node";
import { createAccount } from "db/controllers/accountController";
import { bodyParserHandler, mongoHandler } from "~/utils/httpHandler";
import { AccountBuilder, AccountError } from "buisnesObjects/account";
import { ZodError, ZodParsedType } from "zod";

export async function action({ request }: { request: Request }) {
    let body = await request.json();

    let account = bodyParserHandler(new AccountBuilder(body));

    let res = await mongoHandler(createAccount(account));

    return new Response(JSON.stringify(res.data), {
        status: res.status,
    });
}

type UserContextADT = {
    buisness: BusinessADT | undefined;
    setBuisness: React.Dispatch<React.SetStateAction<BusinessADT | undefined>>;
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const UserContext = createContext<UserContextADT>({} as UserContextADT);

export default function Register() {
    const [buisness, setBuisness] = useState<BusinessADT | undefined>();
    const [user, setUser] = useState<User | undefined>();

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
