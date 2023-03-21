import { ProjectZod } from "buisnessObjects/project";
import { ProjectModel } from "../models/project";

const getProjects = (accountId: string): Promise<Project[]> => {
	return ProjectModel.find({ owner: accountId });
};

const getProject = (projectId: string) => {{
	return ProjectModel.findById(projectId);
}}
const createProject = async (project: Project, accountID: string) => {
	return new Promise((resolve, reject) => {
		try {
			ProjectZod.parse(project);

			const projectDocument = new ProjectModel({ ...project, owner: accountID });

			projectDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getProjects, getProject, createProject };
