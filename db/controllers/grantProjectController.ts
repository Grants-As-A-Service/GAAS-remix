import { GrantProjectModel } from "db/models/grantProject"


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

export { createGrantProject }