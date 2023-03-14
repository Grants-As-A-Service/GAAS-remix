import { getGrants } from "db/controllers/grantController";
import { mongoHandler } from "./httpHandler";

const MATCH_THRESHOLD = 20;

export default async function GrantBusinessMatcher() {
    /*
    Inuition: Grants and businesses both have tags with quantifiers. Let's take the sum of the product of each shared tag and define a "match threshold"
    */

    const [res, status] = await mongoHandler(getGrants());

    if (status == 200) {
        console.log(res);
    }
}