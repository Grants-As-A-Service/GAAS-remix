import { TagNameZod } from "buisnesObjects/tagName";
import { TagNameModel } from "../models/tagName";

const getTagNames = async () => {
	return (await TagNameModel.find()).forEach((doc) => {
		console.log(doc);
	});
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
