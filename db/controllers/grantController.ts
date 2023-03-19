import { GrantZod } from "buisnessObjects/grant";
import { GrantModel } from "../models/grant";

const getGrant = async (request: any) => {};

const getCreatedGrants = (accountId: string) => {
	return GrantModel.find({ creator: accountId });
};

const getAllGrants = () => {
    return GrantModel.find();
}

const createGrant = async (grant: Grant) => {
	return new Promise((resolve, reject) => {
		try {
			const grantDocument = new GrantModel(grant);
			grantDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getGrant, getCreatedGrants, getAllGrants, createGrant };
