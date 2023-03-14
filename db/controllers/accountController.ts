import { AccountModel } from "../models/account";

const getAccount = (email: string) => {
	return AccountModel.findOne({ email: email });
};

const createAccount = (account: Account) => {
	return new Promise((resolve, reject) => {
		try {
			const accountDocument = new AccountModel(account);
			accountDocument.save().then(resolve).catch(reject);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export { getAccount, createAccount };
