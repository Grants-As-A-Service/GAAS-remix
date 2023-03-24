import { getGrantById, getGrantsWithTags } from "db/controllers/grantController";
import { getProject } from "db/controllers/projectController";
import { getTags, getTagsByName } from "db/controllers/tagController";
import { mongoHandler } from "./handler";

const MATCH_THRESHOLD = 5;

function computeMatch(grant: Grant & ID, tagSum: number, projectValue: number) {
    const grantRank = tagSum * (grant.value ? grant.value : 1) * projectValue;
    return grantRank > MATCH_THRESHOLD;
}

export async function MatchGrantsToProject(projectId: string): Promise<string[]> {
    const [projectData, projectStatus] = await mongoHandler(getProject(projectId));
    const [projectTagData, projectTagStatus] = await mongoHandler(getTags(projectId));

    let matchedGrants = [] as string[]; // Stores IDs for the matched grants (top 3)
    let maxGrantRanks = [] as number[]; // Stores the grant scores for the top 3 grants

    if (projectStatus == 200 && projectTagStatus == 200) {
        const project = projectData as Project;
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
                    if (computeMatch(grant, tagSum, project.capex)) {
                        matchedGrants.push(grant._id);
                    };
                }
            }
        }
    }

    return matchedGrants;
}

export async function MatchProjectsToGrant(grantId: string): Promise<string[]> {
    const [grantData, grantDataStatus] = await mongoHandler(getGrantById(grantId));
    const matchedProjects = [] as string[];
    const projectSums = {} as {[projectId: string]: number};
    
    if (grantDataStatus == 200) {
        const grant = grantData as Grant & ID;
        const [tagData, tagDataStatus] = await mongoHandler(getTagsByName(grant.tags));
        if (tagDataStatus == 200) {
            for (let tag of tagData as (Tag & {projectId: string})[]) {
                if (tag.projectId in projectSums) {
                    projectSums[tag.projectId] += tag.quantifier;
                } else {
                    projectSums[tag.projectId] = tag.quantifier;
                }
            }
        }
        
        for (let projectId of Object.keys(projectSums)) {
            const [projectData, projectStatus] = await mongoHandler(getProject(projectId));
            if (projectStatus == 200) {
                const project = projectData as Project;
                if (computeMatch(grant, projectSums[projectId], project.capex)) {
                    matchedProjects.push(projectId);
                }
            }
        }
    }

    return matchedProjects;
}