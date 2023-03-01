import { useContext } from "react";
import { UserContext } from ".";
import { Forum, ForumInput, ForumDropDown, ForumButton } from "../../../components/forums/Forum";
import { useForumValidation, useForumValidationPost } from "../../../components/hooks/forumValidation";
import forumData from "../../../FormData.json";

export const BuisnessCredentialsForum = () => {
    const { user } = useContext(UserContext);

    const [update, submit, isFetching, error, setError] = useForumValidationPost<BusinessADT>(
        {
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
        },
        (state: BusinessADT) => {
            if (state.phone.length !== 10) {
                return "bad phone number";
            }

            return "";
        },
        (state: BusinessADT) => {
            return new Promise((resolve, reject) => {
                fetch("/register", {
                    method: "post",
                    body: JSON.stringify({
                        buisness: state,
                        user,
                    }),
                })
                    .then(resolve)
                    .catch((error) => {
                        console.log("got error");
                        console.log(error);
                        reject(error);
                    });
            });
        }
    );

    return (
        <>
            <Forum>
                <h1 className="text-primary font-title text-2xl m-0 p-0">Buisness Info</h1>
                <ForumInput onTyping={(e) => update(e.target.value, "name")} type="text" label="Buisness Name" />
                <ForumInput onTyping={(e) => update(e.target.value, "phone")} type="tel" label="Buisness Phone" />

                <div>
                    <ForumInput onTyping={(e) => update(e.target.value, "address")} type="address" label="Address" />
                    <ForumInput onTyping={(e) => update(e.target.value, "city")} type="text" label="City" />
                </div>
                <div>
                    <ForumDropDown
                        label="Province"
                        setOption={(option: string) => update(option, "province")}
                        options={forumData.provinces.map((province) => province.name)}
                    />
                    <ForumInput onTyping={(e) => update(e.target.value, "postalCode")} type="text" label="Postal Code" />
                </div>
            </Forum>
            <Forum>
                <h1 className="text-primary font-title text-2xl m-0 p-0">Industry</h1>
                <ForumDropDown label="Industry" setOption={(option: string) => update(option, "industry")} options={forumData.industries} />
                <div>
                    <ForumInput onTyping={(e) => update(e.target.value, "fte")} type="number" label="Full Time Employees" />
                    <ForumInput onTyping={(e) => update(e.target.value, "pte")} type="number" label="Part Time Employees" />
                </div>
                <ForumInput onTyping={(e) => update(e.target.value, "yearOfInception")} type="date" label="Year of Inception" />
                <ForumInput onTyping={(e) => update(e.target.value, "annualRevenue")} type="number" label="Annual Revenue ($)" />

                <h2 className="py-2 text-red-600">{error}</h2>

                <ForumButton onClick={(e) => submit().then(console.log)}>Sign Up</ForumButton>
            </Forum>
        </>
    );
};
