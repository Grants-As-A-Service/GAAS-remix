import { AccountZod } from "buisnesObjects/account";
import { HydratedDocument } from "mongoose";
import { AccountModel } from "../models/account";

const getAccount = () => {};

const createAccount = (account: AccountInfo) => {
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
