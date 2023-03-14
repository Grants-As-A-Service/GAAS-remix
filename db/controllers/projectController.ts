import { ProjectZod } from "buisnessObjects/project";
import { ProjectModel } from "../models/project";

const getProjects = () => {
	return ProjectModel.find();
};

const createProject = async (project: Project) => {
	return new Promise((resolve, reject) => {
		try {
			ProjectZod.parse(project);

			const projectDocument = new ProjectModel(project);

			projectDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getProjects, createProject };
