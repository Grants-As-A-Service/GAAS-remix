import { AccountZod } from "buisnesObjects/account";
import { useContext, useState } from "react";
import { UserContext } from "../../routes/register";
import { Form, FormInput, FormDropDown, FormButton } from "./Form";
import { useFormValidation, useFormValidationPost } from "../hooks/formValidation";
import forumData from "../../../FormData.json";
import { authorize } from "~/utils/firebaseClient";
import { responseHandler } from "~/utils/httpHandler";

export const BuisnessCredentialsForm = () => {
    const { user } = useContext(UserContext);
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
        projects: [],
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

            return "";
        },
        (state: BusinessADT) => {
            let account: AccountInfo = {
                buisness: state,
                user: user as User,
            };

            return fetch("/register", {
                method: "post",
                body: JSON.stringify(account),
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
                <h1 className="text-primary font-title text-2xl m-0 p-0">Buisness Info</h1>
                <FormInput onTyping={(e) => update(e.target.value, "name")} type="text" label="Buisness Name" />
                <FormInput onTyping={(e) => update(e.target.value, "phone")} type="tel" label="Buisness Phone" />

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
};
