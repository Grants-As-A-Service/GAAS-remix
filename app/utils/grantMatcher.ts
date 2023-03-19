import { getAllGrants } from "db/controllers/grantController";
import { getProjects } from "db/controllers/projectController";
import { mongoHandler } from "./handler";

const MATCH_THRESHOLD = 20;

export default async function GrantBusinessMatcher(accountId: string) {
    /*
    Inuition: Grants and businesses both have tags with quantifiers. Let's take the sum of the product of each shared tag and define a "match threshold"
    */

    const [grantData, grantStatus] = await mongoHandler(getAllGrants());
    const [projectData, projectStatus] = await mongoHandler(getProjects(accountId));

    if (grantStatus == 200 && projectStatus == 200) {
        console.log(projectData);
        
    }
}