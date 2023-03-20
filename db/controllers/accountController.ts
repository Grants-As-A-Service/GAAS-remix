import { AccountModel } from "../models/account";

const getAccount = (email: string) => {
	return AccountModel.findOne({ email: email });
};

export const getAccountFromId = (id: string) => {
	return AccountModel.findOne({ _id: id });
};

const getAccountId = async (email: string) => {
	return (await AccountModel.findOne({ email: email }))._id;
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

export { getAccount, createAccount, getAccountId };
