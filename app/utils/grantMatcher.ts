import { getGrantsWithTags } from "db/controllers/grantController";
import { getProject } from "db/controllers/projectController";
import { getTags } from "db/controllers/tagController";
import { mongoHandler } from "./handler";

const MATCH_THRESHOLD = 5;

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