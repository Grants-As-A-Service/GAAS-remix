import { ProjectZod } from "buisnessObjects/project";
import { ProjectModel } from "../models/project";

const getProjects = async (accountId: string): Promise<Project[]> => {
	return (await ProjectModel.find({ owner: accountId })).map((doc) => {
		console.log(doc);
		return {
			name: doc.name,
			description: doc.description,
			startDate: doc.startDate,
			endDate: doc.endDate,
			capex: doc.capex,
			annualOpex: doc.annualOpex,
			status: doc.status,
		};
	});
};

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

export { getProjects, createProject };
