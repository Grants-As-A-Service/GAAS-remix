import { AccountZod } from "buisnesObjects/government";
import { HydratedDocument } from "mongoose";
import { GovernmentModel } from "../models/government";

const getGovernment = (email: string) => {
    return GovernmentModel.findOne({ "email": email });
};

const createGovernment = (gov: GovernmentInfo) => {
    return new Promise((resolve, reject) => {
        try {
            const govDocument = new GovernmentModel(gov);
            govDocument.save().then(resolve).catch(reject);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

export { getGovernment, createGovernment };
