import { GrantZod } from "buisnesObjects/grant";
import { GrantModel } from "../models/grant";

const getGrant = async (request: any) => {};

const getGrants = () => {
    return GrantModel.find();
};

const createGrant = async (grant: Grant) => {
    return new Promise((resolve, reject) => {
        try {
            GrantZod.parse(grant);

            const grantDocument = new GrantModel(grant);

            grantDocument.save().then(resolve).catch(reject);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

export { getGrant, createGrant };
