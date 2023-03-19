import { getGrantsWithTags, getAllGrants } from "db/controllers/grantController";
import { getProject, getProjects } from "db/controllers/projectController";
import { getTags } from "db/controllers/tagController";
import { mongoHandler } from "./handler";

const MATCH_THRESHOLD = 12;

export async function GrantBusinessMatcher(accountId: string) {
    /*
    Inuition: Grants and businesses both have tags with quantifiers. Let's take the sum of the product of each shared tag and define a "match threshold"
    */

    const [grantData, grantStatus] = await mongoHandler(getAllGrants());
    const [projectData, projectStatus] = await mongoHandler(getProjects(accountId));

    if (grantStatus == 200 && projectStatus == 200) {
        console.log(projectData);
        
    }
}

export async function MatchGrantsToProject(projectId: string): Promise<string[]> {
    const [projectData, projectStatus] = await mongoHandler(getProject(projectId));
    const [projectTagData, projectTagStatus] = await mongoHandler(getTags(projectId));

    let matchedGrants = [] as string[];

    if (projectStatus == 200 && projectTagStatus == 200) {
        // Build hash map of project strengths for efficient querying
        const projectTagStrengths = {} as {[key: string]: number};
        for (let tag of projectTagData as Tag[]) {
            projectTagStrengths[tag.name] = tag.quantifier;
        }

        // Fetch grants with project tags
        const [grantData, grantStatus] = await mongoHandler(getGrantsWithTags(projectTagData.map(tagObject => tagObject.name)));
        if (grantStatus == 200) {
            if (grantData.length > 0) {
                for (let grant of grantData as (Grant & {_id: string})[]) {
                    let tagSum = grant.tags.reduce((sum, tag) => {
                        return sum + (projectTagStrengths[tag] || 0);
                    }, 0);
                    if (tagSum > MATCH_THRESHOLD) {
                        matchedGrants.push(grant._id);
                    }
                }
            }
        }
    }

    return matchedGrants;
}