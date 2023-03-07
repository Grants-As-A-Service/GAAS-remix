import { createContext, useEffect, useState } from "react";
import { BuisnessCredentialsForum } from "../../components/BuissnessForum";
import { UserCredentialForm } from "../../components/UserForums";
import { Request, json } from "@remix-run/node";
import { createAccount } from "db/controllers/accountController";
import { bodyParserHandler, mongoHandler } from "~/utils/httpHandler";
import { AccountBuilder, AccountError } from "buisnesObjects/account";


//register post
export async function action({ request }: { request: Request }) {
    let body = await request.json();

    let account = bodyParserHandler(new AccountBuilder(body));

    let [res, status] = await mongoHandler(createAccount(account));

    console.log(res);

    return new Response(JSON.stringify(res), {
        status: status,
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
                        {typeof user === "undefined" ? (
                            <UserCredentialForm />
                        ) : (
                            <BuisnessCredentialsForum />
                        )}
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    );
}
