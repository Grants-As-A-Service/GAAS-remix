import { TagNameZod } from "buisnessObjects/tagName";
import { TagNameModel } from "../models/tagName";

const getTagNames = () => {
	return TagNameModel.find();
};

const createTagName = (tagname: string) => {
	return new Promise((resolve, reject) => {
		try {
			TagNameZod.parse(tagname);

			const tagNameDocument = new TagNameModel(tagname);

			tagNameDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getTagNames, createTagName };
