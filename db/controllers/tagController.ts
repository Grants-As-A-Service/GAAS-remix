import { TagZod } from "buisnessObjects/tag";
import { TagModel } from "../models/tag";

const getTags = (projectId: string) => {
	return TagModel.find({ projectId: projectId });
};

const createTag = (tag: Tag, projectId: string) => {
	return new Promise((resolve, reject) => {
		try {
			TagZod.parse(tag);

			const tagDocument = new TagModel({ ...tag, projectId });

			tagDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getTags, createTag };
