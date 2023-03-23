import { useContext, useEffect, useState } from "react";
import { UserContextADT } from "../register";
import { Form, FormInput, FormDropDown, FormButton } from "../../components/forms/Form";
import { useFormValidation, useFormValidationPost } from "../../components/hooks/formValidation";
import forumData from "../../../FormData.json";
import { authorize } from "~/utils/firebaseClient";
import { useOutletContext } from "@remix-run/react";
import { Request, json, ActionArgs } from "@remix-run/node";
import { createAccount, getAccountId } from "db/controllers/accountController";
import { bodyParserHandler, mongoHandler, mongoHandlerThrows } from "~/utils/handler";
import { BuisnessBuilder } from "buisnessObjects/buisness";
import { createBusiness } from "db/controllers/businessController";
import { AccountBuilder } from "buisnessObjects/account";

export async function action({ request }: ActionArgs) {
    let body = await request.json();

    let buisness = bodyParserHandler(new BuisnessBuilder(body.buisness));
    let account = bodyParserHandler(new AccountBuilder(body.user));

    let accountID = await mongoHandlerThrows(getAccountId(account.email));

    let res = await mongoHandlerThrows(createBusiness(buisness, accountID as string));

    return new Response(JSON.stringify({ res }));
}

export default function Business() {
    const { user } = useOutletContext<UserContextADT>();
    const [initState] = useState<Business>({
        name: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        industry: "",
        fte: 0,
        pte: 0,
        annualRevenue: 0,
        yearOfInception: new Date(),
    });

    const [update, submit, error, setError] = useFormValidationPost<BusinessADT>(
        initState,
        (state: BusinessADT) => {
            if (state.phone.length !== 10) {
                return "bad phone number";
            }
            for (const [key, value] of Object.entries(state)) {
                //@ts-ignore
                if (initState[key] === value) {
                    return "enter a value for " + key;
                }
            }
        },
        (state: Business) => {
            return fetch("/register/buisness", {
                method: "post",
                body: JSON.stringify({ buisness: state, user }),
            });
        }
    );

    const upload = () => {
        submit().then(() => {
            authorize().then(() => {
                window.location.href = "/home";
            });
        });
    };

    return (
        <>
            <Form>
                <h1 className="text-primary font-title text-2xl m-0 p-0">Business Info</h1>
                <FormInput onTyping={(e) => update(e.target.value, "name")} type="text" label="Business Name" />
                <FormInput onTyping={(e) => update(e.target.value, "phone")} type="tel" label="Business Phone" />

                <div>
                    <FormInput onTyping={(e) => update(e.target.value, "address")} type="address" label="Address" />
                    <FormInput onTyping={(e) => update(e.target.value, "city")} type="text" label="City" />
                </div>
                <div>
                    <FormDropDown
                        label="Province"
                        setOption={(option: string) => update(option, "province")}
                        options={forumData.provinces.map((province) => province.name)}
                    />
                    <FormInput onTyping={(e) => update(e.target.value, "postalCode")} type="text" label="Postal Code" />
                </div>
            </Form>
            <Form>
                <h1 className="text-primary font-title text-2xl m-0 p-0">Industry</h1>
                <FormDropDown label="Industry" setOption={(option: string) => update(option, "industry")} options={forumData.industries} />
                <div>
                    <FormInput onTyping={(e) => update(e.target.value, "fte")} type="number" label="Full Time Employees" />
                    <FormInput onTyping={(e) => update(e.target.value, "pte")} type="number" label="Part Time Employees" />
                </div>
                <FormInput onTyping={(e) => update(e.target.value, "yearOfInception")} type="date" label="Year of Inception" />
                <FormInput onTyping={(e) => update(e.target.value, "annualRevenue")} type="number" label="Annual Revenue ($)" />

                <h2 className="py-2 text-red-600">{error}</h2>

                <FormButton onClick={(e) => upload()}>Sign Up</FormButton>
            </Form>
        </>
    );
}