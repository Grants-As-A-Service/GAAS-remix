import { GrantProjectModel } from "db/models/grantProject"

const getGrantMatchesByProject = (projectId: string) => {
    return GrantProjectModel.find({
        projectId: projectId
    });
};

const createGrantProject = async (grantId: string, projectId: string) => {
    return new Promise((resolve, reject) => {
        try {
            const grantProjectDocument = new GrantProjectModel({
                grantId, projectId
            });
            grantProjectDocument.save().then(resolve).catch(reject);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

export { createGrantProject, getGrantMatchesByProject }