import { BusinessModel } from "../models/business";

export const getBusiness = (email: string) => {
	return BusinessModel.findOne({ email: email });
};

export const createBusiness = (business: Business, accountRef: string) => {
	return new Promise((resolve, reject) => {
		try {
			const businessDocument = new BusinessModel({
				...business,
				accountId: accountRef,
			});
			businessDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};