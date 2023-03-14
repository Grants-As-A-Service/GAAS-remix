import { TagZod } from "buisnessObjects/tag";
import { TagModel } from "../models/tag";

const getTags = () => {
	return TagModel.find();
};

const createTag = async (tag: Tag) => {
	return new Promise((resolve, reject) => {
		try {
			TagZod.parse(tag);

			const tagDocument = new TagModel(tag);

			tagDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getTags, createTag };
