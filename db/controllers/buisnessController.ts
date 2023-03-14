import { BusinessModel } from "../models/business";

const getBuisness = (email: string) => {
	return BusinessModel.findOne({ email: email });
};

const createBuisness = (business: Business, accountRef: string) => {
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

export { getBuisness, createBuisness };
