import { GrantBusinessModel } from "db/models/grantbusiness";


const getGrantBusinessMatches = async (id: string) => {
    return GrantBusinessModel.find({'businessId': id}); // fetch the grand associated with business
}

export { getGrantBusinessMatches };